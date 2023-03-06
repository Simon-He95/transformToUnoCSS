import { transfromCode } from './transformCode'

export function vitePluginTransformToUnocss() {
  return {
    name: 'vite-plugin-transform-to-unocss',
    transform(code: string, id: string) {
      const suffix = id.endsWith('.vue')
        ? 'vue'
        : id.endsWith('.tsx')
          ? 'tsx'
          : ''
      if (!suffix)
        return code
      return transfromCode(code, id, suffix)
    },
    enforce: 'pre',
  }
}
