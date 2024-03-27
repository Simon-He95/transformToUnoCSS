import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { transfromCode } from './transformCode'
import type { Options } from './type'

const unplugin = createUnplugin((options: Options = {}): any => {
  const filter = createFilter(options.include, options.exclude)
  let globalCss: any = null
  return [
    {
      name: 'unplugin-transform-to-unocss',
      enforce: 'pre',
      async configResolved(config: any) {
        globalCss = config.css?.preprocessorOptions
      },
      transformInclude(id: string) {
        return filter(id)
      },
      async transform(code: string, id: string) {
        const suffix = id.endsWith('.vue')
          ? 'vue'
          : id.endsWith('.tsx')
            ? 'tsx'
            : ''
        if (!suffix)
          return code

        return await transfromCode(code, {
          filepath: id,
          type: suffix,
          globalCss,
        })
      },
    },
  ]
})

export const viteTransformToUnocss = unplugin.vite
export const rollupTransformToUnocss = unplugin.rollup
export const webpackTransformToUnocss = unplugin.webpack
export const esbuildTransformToUnocss = unplugin.esbuild
