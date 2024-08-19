import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { readPackageJSON } from 'pkg-types'
import { join, resolve } from 'pathe'

const stringify = contents => JSON.stringify(contents, null, 2)

const packages = await globby([
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
]).then(r => r.sort())
const names = new Set()

await fsp.rm('.vercel/output', { recursive: true, force: true })

// Create public files
await fsp.mkdir('.vercel/output/static', { recursive: true })
await fsp.mkdir('.vercel/output/functions', { recursive: true })
for (const config of packages) {
  const { name } = await readPackageJSON(resolve(config))
  const output = resolve(config, '../.vercel/output')
  try {
    const stats = await fsp.stat(output)
    if (!stats.isDirectory()) continue
  } catch {
    continue
  }

  await fsp.cp(join(output, 'static'), `.vercel/output/static/${name}`, {
    recursive: true,
  })
  await fsp.cp(
    join(output, 'functions/__nitro.func'),
    `.vercel/output/functions/${name}.func`,
    {
      recursive: true,
    }
  )
  names.add(name)
}

// Create middleware
await fsp.mkdir('.vercel/output/functions/_middleware.func', {
  recursive: true,
})
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/index.js',
  `
const names = ${stringify([...names])}

export default function middleware(req) {
  const hostname = req.headers.get('host')
  const url = new URL(req.url)
  const path = url.pathname.split('/')[1]

  if (hostname === 'examples.zunder.ai' && names.includes(path)) {
    const response = new Response()
    response.headers.set('x-middleware-rewrite', url.pathname)
    return response
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: 'https://zunder.ai'
    }
  })
}`
)
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/.vc-config.json',
  stringify({
    runtime: 'edge',
    entrypoint: 'index.js',
  })
)
await fsp.writeFile(
  '.vercel/output/config.json',
  stringify({
    version: 3,
    routes: [
      {
        src: '/(.*)',
        middlewarePath: '_middleware',
        continue: true,
      },
      {
        handle: 'filesystem',
      },
      ...[...names].map(name => ({
        src: `/${name}(/.*)?`,
        dest: `/${name}`,
      })),
    ],
  })
)

console.log('Successfully built zunder/examples:')
for (const name of names) {
  console.log(`  - ${name}`)
}