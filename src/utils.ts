import { createGenerator } from '@unocss/core'
import presetUno from '@unocss/preset-uno'

export type CssType = 'less' | 'scss' | 'css' | 'styl'
export const TRANSFER_FLAG = '.__unocss_transfer__'

export function transformUnocssBack(code: string[]) {
  const result: string[] = []
  return new Promise((resolve) => {
    createGenerator(
      {},
      {
        presets: [presetUno()],
      },
    )
      .generate(code || '')
      .then((res: any) => {
        const css = res.getLayers()
        code.forEach((item) => {
          try {
            const reg = new RegExp(
              `${item.replace(/([!()[\]*])/g, '\\\\$1')}{(.*)}`,
            )
            const match = css.match(reg)
            if (!match)
              return
            const matcher = match[1]

            matcher
              .split(';')
              .filter(Boolean)
              .forEach((item: string) => {
                const [key, v] = item.split(':')
                result.push(key.trim())
              })
          }
          catch (error) {}
        })

        resolve(result)
      })
  })
}

export function diffTemplateStyle(before: string, after: string) {
  const s1 = before.match(/<style scoped>.*<\/style>/s)!
  const s2 = after.match(/<style scoped>.*<\/style>/s)!
  if (!s1 || !s2)
    return false
  return s1[0] === s2[0]
}

export function isEmptyStyle(code: string) {
  return /<style scoped>\s*<\/style>/.test(code)
}

export function getStyleScoped(code: string) {
  const match = code.match(/<style scoped>(.*)<\/style>/s)
  if (!match)
    return ''
  return match[1]
}

export function getCssType(filename: string) {
  const ext = filename.split('.').pop()!
  const result = ext === 'styl' ? 'stylus' : ext
  return result as CssType
}

/**
 * 动态导入 Vue Compiler SFC，避免打包时的问题
 * @returns Vue Compiler SFC 中的方法
 */
export async function getVueCompilerSfc() {
  const { parse } = await import('@vue/compiler-sfc')
  return { parse }
}
