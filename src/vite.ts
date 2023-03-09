import { transfromCode } from './transformCode'

export function vitePluginTransformToUnocss() {
  return {
    name: 'vite-plugin-transform-to-unocss',
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
    enforce: 'pre',
  }
}
