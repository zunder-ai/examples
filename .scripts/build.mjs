import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { readPackageJSON } from 'pkg-types'
import { join, resolve, dirname } from 'pathe'

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

  const relativePath = dirname(config).replace('examples/', '')
  await fsp.cp(join(output, 'static'), join('.vercel/output/static', relativePath), { recursive: true })
  await fsp.cp(
    join(output, 'functions/__nitro.func'),
    join('.vercel/output/functions', `${relativePath}.func`),
    { recursive: true }
  )
  names.add(relativePath)
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
  const forced = req.url.match(/\\?force=(.*)$/)?.[1]
  const hostname = req.headers.get('host')
  const subdomain = forced || req.headers.get('cookie')?.match(/forced=([^;]*)(;|$)/)?.[1] || hostname.split('.').shift()

  if (names.includes(subdomain)) {
    const response = new Response()
    const url = new URL(req.url)
    response.headers.set('x-middleware-rewrite', '/' + subdomain + url.pathname)
    if (forced) {
      response.headers.set('set-cookie', \`forced=$\{forced}\`)
    }
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
      ...[...names].flatMap(path => [
        {
          src: `/${path}`,
          dest: `/${path}`
        },
        {
          src: `/${path}/(.*)`,
          dest: `/${path}/$1`
        },
        {
          src: `/${path}/_nuxt/(.*)`,
          dest: `/${path}/_nuxt/$1`
        }
      ]),
    ],
  })
)

console.log('Successfully built zunderai/examples:')
let index = 0
for (const name of names) {
  const treeChar = index++ === names.size - 1 ? '└─' : '├─'
  console.log(`  ${treeChar} ${name} (https://${name}.example.zunder.ai)`)
}