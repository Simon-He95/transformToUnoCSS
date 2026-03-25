import { describe, expect, it } from 'vitest'
import { transformCode } from '../src'

describe('media query prefixes', () => {
  it('keeps screen and min-width queries as min prefixes and max-width queries as max prefixes', async () => {
    const code = `<template>
  <div class="box">Hello</div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  .box {
    color: red;
  }
}

@media (max-width: 768px) {
  .box {
    background-color: red;
  }
}
</style>
`

    const result = await transformCode(code, { type: 'vue' })

    expect(result).toContain('md:text-red')
    expect(result).toContain('max-md:bg-red')
  })

  it('maps reduced-motion queries to motion variants', async () => {
    const code = `<template>
  <div class="box">Hello</div>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  .box {
    transition: none !important;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .box {
    color: red;
  }
}
</style>
`

    const result = await transformCode(code, { type: 'vue' })

    expect(result).toContain('motion-reduce:transition-none!')
    expect(result).toContain('motion-safe:text-red')
    expect(result).not.toContain('@media (prefers-reduced-motion')
  })
})
