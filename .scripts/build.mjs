import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { readPackageJSON } from 'pkg-types'
import { join, resolve, dirname } from 'pathe'
import { execSync } from 'child_process'

const stringify = contents => JSON.stringify(contents, null, 2)

const packages = await globby([
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
]).then(r => r.sort())

const paths = new Set()

await fsp.rm('.vercel/output', { recursive: true, force: true })

// Create public files
await fsp.mkdir('.vercel/output/static', { recursive: true })
await fsp.mkdir('.vercel/output/functions', { recursive: true })
for (const config of packages) {
  try {
    // Attempt to build with frozen-lockfile
    execSync('pnpm install --frozen-lockfile', { cwd: dirname(config), stdio: 'inherit' })
  } catch (error) {
    if (error.message.includes('ERR_PNPM_OUTDATED_LOCKFILE')) {
      console.warn(`Warning: Outdated lockfile detected in ${dirname(config)}. Updating...`)
      // If frozen-lockfile fails, update the lockfile
      execSync('pnpm install --no-frozen-lockfile', { cwd: dirname(config), stdio: 'inherit' })
    } else {
      // If it's a different error, rethrow it
      throw error
    }
  }

  const { name } = await readPackageJSON(resolve(config))
  const output = resolve(config, '../.vercel/output')
  try {
    const stats = await fsp.stat(output)
    if (!stats.isDirectory()) continue
  } catch {
    continue
  }

  const relativePath = dirname(config).replace('examples/', '')
  await fsp.cp(join(output, 'static'), `.vercel/output/static/${relativePath}`, {
    recursive: true,
  })
  await fsp.cp(
    join(output, 'functions/__nitro.func'),
    `.vercel/output/functions/${relativePath.replace('/', '-')}.func`,
    {
      recursive: true,
    }
  )
  paths.add(relativePath)
}

// Create middleware
await fsp.mkdir('.vercel/output/functions/_middleware.func', {
  recursive: true,
})
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/index.js',
  `
const paths = ${stringify([...paths])}

export default function middleware(req) {
  const hostname = req.headers.get('host')
  const url = new URL(req.url)
  const path = url.pathname.slice(1)

  if (hostname === 'examples.zunder.ai' && paths.some(p => path.startsWith(p))) {
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
      ...[...paths].map(path => ({
        src: `/${path}(/.*)?`,
        dest: `/${path}`,
      })),
    ],
  })
)

console.log('Successfully built zunder/examples:')
for (const path of paths) {
  console.log(`  - ${path}`)
}