import fsp from 'node:fs/promises'
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
})
