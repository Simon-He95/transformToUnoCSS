import type { Options } from './type'
import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'
import { transformCode } from './transformCode'

const unplugin = createUnplugin((options?: Options): any => {
  // 默认排除 node_modules，用户可以通过 exclude 选项覆盖
  const defaultExclude = ['**/node_modules/**']
  const userExclude = options?.exclude
    ? Array.isArray(options.exclude)
      ? options.exclude
      : [options.exclude]
    : []
  const finalExclude = [...defaultExclude, ...userExclude]

  const filter = createFilter(options?.include, finalExclude)
  let globalCss: any = null
  return [
    {
      name: 'unplugin-transform-to-unocss',
      enforce: 'pre',
      async configResolved(config: any) {
        globalCss = config.css?.preprocessorOptions
      },
      transformInclude(id: string) {
        // 额外的安全检查：确保不处理 node_modules 中的文件
        if (id.includes('node_modules')) {
          return false
        }
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
        return await transformCode(code, {
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
export const rspackTransformToUnocss = unplugin.rspack
export const farmTransformToUnocss = unplugin.farm
export const rolldownTransformToUnocss = unplugin.rolldown
