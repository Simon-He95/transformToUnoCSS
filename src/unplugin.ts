import type { Options } from './type'
import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'
import { transfromCode } from './transformCode'

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
        let suffix!: 'vue' | 'tsx'
        if (id.endsWith('.vue')) {
          suffix = 'vue'
        }
        else if (id.endsWith('lang.tsx')) {
          // skip
        }
        else if (id.endsWith('.tsx')) {
          suffix = 'tsx'
        }

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
