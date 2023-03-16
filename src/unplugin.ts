import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { transfromCode } from './transformCode'
import type { Options } from './utils'

// export function vitePluginTransformToUnocss() {
//   return {
//     name: 'vite-plugin-transform-to-unocss',
//     async transform(code: string, id: string) {
//       const suffix = id.endsWith('.vue')
//         ? 'vue'
//         : id.endsWith('.tsx')
//           ? 'tsx'
//           : ''
//       if (!suffix)
//         return code

//       return await transfromCode(code, id, suffix)
//     },
//     enforce: 'pre',
//   }
// }

const unplugin = createUnplugin((options: Options = {}): any => {
  const filter = createFilter(options.include, options.exclude)
  return [
    {
      name: 'unplugin-transform-to-unocss',
      enforce: 'pre',
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

        return await transfromCode(code, id, suffix)
      },
    },
  ]
})

export const viteTransformToUnocss = unplugin.vite
export const rollupTransformToUnocss = unplugin.rollup
export const webpackTransformToUnocss = unplugin.webpack
export const esbuildTransformToUnocss = unplugin.esbuild
