import { parse } from 'vue/compiler-sfc'
import { transformCss } from './transformCss'
import { tansformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

export function transfromCode(code: string) {
  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)

  if (errors.length)
    return code
  // transform inline-style

  code = tansformInlineStyle(code)

  if (!template || !styles.length)
    return code
  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = transformMedia(code)
  code = transferMediaCode
  // transform class
  const {
    attrs: { scoped },
    content: style,
  } = styles[0]

  // 只针对scoped css处理
  if (scoped)
    code = transformCss(style, code)

  // 还原@media 未匹配到的class
  code = transformBack(code)

  return prettier(code)
}

const emptyStyle = /<style[\s\w'=]*>([\n\s]*)/
function prettier(code: string) {
  const {
    descriptor: { styles },
  } = parse(code)

  if (!styles.length)
    return code.replace(emptyStyle, (all, v) => all.replace(v, ''))

  const { content } = styles[0]
  return code.replace(content, content.replace(/\n+/g, '\n'))
}
