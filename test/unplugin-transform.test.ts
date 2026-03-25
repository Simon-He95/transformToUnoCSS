import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { viteTransformToUnocss } from '../src'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map(dir => fsp.rm(dir, { recursive: true, force: true })))
})

describe('unplugin transform behavior', () => {
  it('transforms jsx files instead of skipping them', async () => {
    const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'transform-to-unocss-jsx-'))
    tempDirs.push(dir)

    await fsp.writeFile(
      path.join(dir, 'styles.css'),
      '.title { color: red; }',
      'utf-8',
    )

    const plugin = viteTransformToUnocss()
    const code = `
import { defineComponent } from 'vue'
import './styles.css'

export default defineComponent({
  setup() {
    return () => <div class="title">Hello</div>
  }
})
`

    const result = await plugin.transform(code, path.join(dir, 'App.jsx'))

    expect(result).toContain('text-red')
  })

  it('uses vite preprocessorOptions additionalData when compiling styles', async () => {
    const plugin = viteTransformToUnocss()

    await plugin.configResolved({
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '$brand-color: red;',
          },
        },
      },
      resolve: {
        alias: {},
      },
    })

    const result = await plugin.transform(
      `<template>
  <div class="title">Hello</div>
</template>

<style scoped lang="scss">
.title {
  color: $brand-color;
}
</style>
`,
      '/virtual/App.vue',
    )

    expect(result).toContain('text-red')
    expect(result).not.toContain('$brand-color')
  })
})
