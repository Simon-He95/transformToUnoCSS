import { parse } from 'vue/compiler-sfc'
import { prettierCode } from './prettierCode'
import { transformCss } from './transformCss'
import { tansformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

export async function transformVue(
  code: string,
  isJsx?: boolean,
  filepath?: string,
) {
  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)

  if (errors.length)
    return code
  // transform inline-style

  code = tansformInlineStyle(code, isJsx)

  if (!template || !styles.length)
    return code
  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = await transformMedia(code, isJsx)

  code = transferMediaCode

  // transform class
  const {
    attrs: { scoped },
    content: style,
  } = styles[0]

  // 只针对scoped css处理
  if (scoped)
    code = await transformCss(style, code, '', isJsx, filepath)

  // 还原@media 未匹配到的class
  code = transformBack(code)

  return prettierCode(code)
}
