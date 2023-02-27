import { transfromCode } from './transformCode'

export function vitePluginTransformToUnocss() {
  return {
    name: 'vite-plugin-transform-to-unocss',
    transform(code: string) {
      return transfromCode(code)
    },
    enforce: 'pre',
  }
}
