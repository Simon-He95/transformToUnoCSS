import { createGenerator } from '@unocss/core'
import type { FilterPattern } from '@rollup/pluginutils'
import presetUno from '@unocss/preset-uno'

export type CssType = 'less' | 'scss' | 'css' | 'stylus'
export const flag = '.__unocss_transfer__'

export function isNot(s: string) {
  return /\[&:not\(/.test(s)
}
export function isCalc(s: string) {
  return s.startsWith('calc(')
}

export function getFirstName(s: string) {
  return s.split('-')[0]
}

export function getLastName(s: string) {
  const all = s.split('-')
  return all[all.length - 1]
}

export function isUrl(s: string) {
  return s.startsWith('url(')
}

export function isPercent(s: string) {
  return s.endsWith('%')
}

export function isHex(hex: string) {
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function getVal(val: string, transform?: Function) {
  if (isCalc(val) || isUrl(val) || isHex(val) || isRgb(val) || isPercent(val))
    return `="[${trim(val, 'all').replace(/['"]/g, '')}]"`
  return `-${transform ? transform(val) : val}`
}

export function getHundred(n: string | number) {
  return +n * 100
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('-')
}

export function joinWithUnderLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('_')
}

export type TrimType = 'all' | 'pre' | 'around' | 'post'

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns
 */
export function trim(s: string, type: TrimType = 'around'): string {
  if (type === 'pre')
    return s.replace(/(^\s*)/g, '')
  if (type === 'post')
    return s.replace(/(\s*$)/g, '')
  if (type === 'all')
    return s.replace(/\s+/g, '')
  if (type === 'around')
    return s.replace(/(^\s*)|(\s*$)/g, '')
  return s
}

export function transformImportant(v: string) {
  if (v.endsWith('!important'))
    return [v.replace(/\s*\!important/, '').trim(), '!']
  return [v.trim(), '']
}

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
          const reg = new RegExp(`${item.replace(/!/g, '\\\\!')}{(.*)}`)
          const match = css.match(reg)
          if (!match)
            return
          const matcher = match[1]

          result.push(
            matcher
              .split(';')
              .filter((i: any) => /^\w+[\w\-]*:/.test(i))[0]
              .split(':')[0],
          )
        })

        resolve(result)
      })
  })
}

export function diffTemplateStyle(before: string, after: string) {
  const s1 = before.match(/<style scoped>.*<\/style>/s)!
  const s2 = after.match(/<style scoped>.*<\/style>/s)!

  return s1[0] === s2[0]
}

export function isEmptyStyle(code: string) {
  return /<style scoped>[\n\s]*<\/style>/.test(code)
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

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}

export function joinEmpty(str: string) {
  return str
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*,\s*/g, ',')
}
