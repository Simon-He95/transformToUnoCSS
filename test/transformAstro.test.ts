import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transformAstro } from '../src/transformAstro'

describe('accent', () => {
  it('accent-color: inherit;', async () => {
    const html = await fsp.readFile('./test/demo/astro.astro', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/astro.astro')

    expect(await transformAstro(html)).toMatchInlineSnapshot(
    `
      "---
      export const prerender = true;
      ---
      	
      <main>
      		<h1 class="red text-20px">hi </h1>
      	</main>
      "
    `)
  })

  it('supports style attributes and resolveAlias when compiling astro styles', async () => {
    const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'transform-to-unocss-astro-'))
    const srcDir = path.join(dir, 'src')
    await fsp.mkdir(path.join(srcDir, 'styles'), { recursive: true })
    await fsp.writeFile(
      path.join(srcDir, 'styles', '_tokens.scss'),
      '$brand-color: red;',
      'utf-8',
    )

    const code = `---
export const prerender = true;
---

<main>
  <h1 class="title">hi</h1>
</main>

<style lang="scss">
@use "@/styles/tokens" as *;

.title {
  color: $brand-color;
}
</style>
`

    const result = await transformAstro(code, {
      filepath: path.join(dir, 'pages', 'index.astro'),
      resolveAlias: { '@': srcDir },
    })

    expect(result).toContain('text-red')
    expect(result).not.toContain('$brand-color')

    await fsp.rm(dir, { recursive: true, force: true })
  })

  it('transforms inline styles even when no style block is present', async () => {
    const code = `---
export const prerender = true;
---

<main>
  <h1 style="color: red;">hi</h1>
</main>
`

    const result = await transformAstro(code)

    expect(result).toContain('text-red')
  })

  it('transforms style blocks that appear before the markup', async () => {
    const code = `---
export const prerender = true;
---

<style lang="scss">
.title {
  color: red;
}
</style>

<main>
  <h1 class="title">hi</h1>
</main>
`

    const result = await transformAstro(code)

    expect(result).toContain('text-red')
  })
})
