import type { CssType } from './utils'
import { parse } from 'vue/compiler-sfc'
import { compilerCss } from './compilerCss'
import { prettierCode } from './prettierCode'
import { transformCss } from './transformCss'
import { transformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

interface Options {
  isJsx?: boolean
  filepath?: string
  isRem?: boolean
  globalCss?: any
}

export async function transformVue(code: string, options?: Options) {
  const { isJsx, filepath, isRem, globalCss } = options || {}
  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)
  if (errors.length || !template || !styles.length)
    return code
  // transform inline-style
  code = transformInlineStyle(code, isJsx, isRem)
  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = await transformMedia(
    code,
    isJsx,
    isRem,
  )

  code = transferMediaCode
  // transform class
  const {
    attrs: { scoped },
    content: style,
    lang = 'css',
  } = styles[0]

  const css = await compilerCss(style, lang as CssType, filepath, globalCss)
  if (css) {
    // 能被正确编译解析的css
    code = code.replace(style, `\n${css}\n`).replace(` lang="${lang}"`, '')
    // 只针对scoped css处理
    if (scoped)
      code = await transformCss(css, code, '', isJsx, filepath, isRem)
  }

  // 还原@media 未匹配到的class
  code = transformBack(code)

  return prettierCode(code)
}
