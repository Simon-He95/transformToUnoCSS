import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transformCode } from '../src'

describe('multiple Vue style blocks', () => {
  it('transforms every scoped style block', async () => {
    const code = `<template>
  <div class="one two">Hello</div>
</template>

<style scoped>
.one {
  color: red;
}
</style>

<style scoped>
.two {
  font-size: 12px;
}
</style>
`

    const result = await transformCode(code, { type: 'vue' })

    expect(result).toContain('class="one two')
    expect(result).toContain('text-red')
    expect(result).toContain('text-12px')
    expect(result).not.toContain('.one')
    expect(result).not.toContain('.two')
  })

  it('keeps targeting the matching style block when a later block imports css', async () => {
    const dir = await fsp.mkdtemp(
      path.join(os.tmpdir(), 'transform-to-unocss-multi-style-'),
    )
    const filepath = path.join(dir, 'App.vue')

    await fsp.writeFile(
      path.join(dir, 'colors.css'),
      '.from-import { color: red; }',
      'utf-8',
    )

    const code = `<template>
  <div class="first from-import">Hello</div>
</template>

<style scoped>
.first {
  font-size: 12px;
}
</style>

<style scoped>
@import "./colors.css";
</style>
`

    const result = await transformCode(code, { filepath, type: 'vue' })

    expect(result).toContain('text-12px')
    expect(result).toContain('text-red')
    expect(result).not.toContain('@import "./colors.css";')

    await fsp.rm(dir, { recursive: true, force: true })
  })
})
