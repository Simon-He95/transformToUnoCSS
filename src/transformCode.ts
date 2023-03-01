import { parse } from 'vue/compiler-sfc'
import { transformCss } from './transformCss'
import { tansformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

export function transfromCode(code: string) {
  const {
    descriptor: { template, styles },
  } = parse(code)

  // transform inline-style
  const [transferStyleCode, transformFn] = tansformInlineStyle(code)
  code = transferStyleCode
  if (!template || !styles.length)
    return code
  const stack = template.ast
  // transform @media
  const [transferMediaCode, transformBack] = transformMedia(
    code,
    stack,
    transformFn,
  )
  code = transferMediaCode
  // transform class
  const {
    attrs: { scoped },
    content: style,
  } = styles[0]

  // 只针对scoped css处理
  if (scoped)
    code = transformCss(style, code, stack, transformFn)

  // 还原@media 未匹配到的class
  code = transformBack(code)
  return prettier(code)
}

function prettier(code: string) {
  const {
    descriptor: { styles },
  } = parse(code)
  const { content } = styles[0]
  return code.replace(content, content.replace(/\n+/g, '\n'))
}
