import fsp from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { transformSvelte } from '../src/transformSvelte'

describe('accent', () => {
  it('accent-color: inherit;', async () => {
    const html = await fsp.readFile('./test/demo/svelte.svelte', 'utf-8')
    expect(await transformSvelte(html, {})).toMatchInlineSnapshot(`
      "<script lang="ts">
      	let name = ''
      	let input: HTMLInputElement;
      </script>
      <form class="pt-1rem" on:submit|preventDefault={go}>
      	<input bind:this={input} bind:value={name} type="text" aria-label="What's your name?" placeholder="What's your name?">
      	<button class="font-[inherit] font-size-inherit px-2em py-1em text-[#ff3e00] bg-[rgba(255,62,0,0.1)] rounded-[2em] border-2px border-solid border-[rgba(255,62,0,0)] outline-none w-200px tabular-nums cursor-pointer pt-1rem [&:focus]-border-2px [&:focus]-border-solid [&:focus]-border-[#ff3e00] [&:active]-bg-[rgba(255,62,0,0.2)]" type="submit">
      		GO
      	</button>
      </form>
      "
    `)
  })

  it('supports style attributes and files without style blocks', async () => {
    const withLang = `<script lang="ts">
  let name = ''
</script>

<h1 class="title">hi</h1>

<style lang="scss">
.title {
  color: red;
}
</style>
`
    const withLangResult = await transformSvelte(withLang)
    expect(withLangResult).toContain('text-red')

    const withoutStyle = `<script lang="ts">
  let name = ''
</script>

<h1 style="color: red;">hi</h1>
`
    const withoutStyleResult = await transformSvelte(withoutStyle)
    expect(withoutStyleResult).toContain('text-red')
  })

  it('transforms style blocks that appear before the markup', async () => {
    const code = `<script lang="ts">
  let name = ''
</script>

<style lang="scss">
.title {
  color: red;
}
</style>

<h1 class="title">hi</h1>
`

    const result = await transformSvelte(code)

    expect(result).toContain('text-red')
  })
})
