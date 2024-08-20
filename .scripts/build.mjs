import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { resolve, dirname, join } from 'path'

const packages = await globby([
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
]).then(r => r.sort())

await fsp.rm('.vercel/output', { recursive: true, force: true })
await fsp.mkdir('.vercel/output/static', { recursive: true })
await fsp.mkdir('.vercel/output/functions', { recursive: true })

const paths = new Set()

for (const config of packages) {
  const output = resolve(config, '../.vercel/output')
  try {
    await fsp.stat(output)
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
  paths.add(relativePath)
}

// Create simplified config.json with adjusted routing
await fsp.writeFile(
  '.vercel/output/config.json',
  JSON.stringify({
    version: 3,
    routes: [
      { handle: 'filesystem' },
      ...[...paths].flatMap(path => [
        {
          src: `/${path}`,
          dest: `/${path}`
        },
        {
          src: `/${path}/(.*)`,
          dest: `/${path}/$1`
        }
      ]),
    ],
  }, null, 2)
)

console.log('Successfully built zunder/examples:')
paths.forEach(path => console.log(`  - ${path}`))