import { describe, expect, it } from 'vitest'
import { transformCode } from '../src'

describe('group parent handling', () => {
  it('adds a group class without crashing when the parent has no class attribute', async () => {
    const code = `<template>
  <section>
    <div>
      <span class="label">Hello</span>
    </div>
  </section>
</template>

<style scoped>
div:hover span {
  color: red;
}
</style>
`

    const result = await transformCode(code, { type: 'vue' })

    expect(result).toContain('[&:hover_span]-text-red')
  })
})
