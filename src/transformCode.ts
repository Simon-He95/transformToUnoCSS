import { parse } from 'vue/compiler-sfc'
import { trim } from './utils'
import { transformStyleToUnocss } from '.'

const styleReg = /(:)?style="(.*)"/
export function transfromCode(code: string) {
  const match = code.match(styleReg)
  if (!match)
    return code
  const [target, comma, style] = match
  if (comma)
    return code

  const {
    descriptor: { template, styles },
  } = parse(code)
  // transform inline-style
  code = code.replace(target, transformStyleToUnocss(style))
  if (!template)
    return code
  if (styles.length) {
    // transform class
    const {
      attrs: { scoped },
      content: style,
    } = styles[0]
    if (scoped) {
      style.replace(
        /(.*){([\\n\s\w\-.:;%\(\)+'"]*)}/g,
        (all: any, name: any, value: any) => {
          const before = trim(value.replaceAll('\n', ''), 'all')
          const after = transformStyleToUnocss(before)
          // 未被转换跳过
          if (before === after)
            return
          // 找template > ast
          name = name.replace(/\s+/g, '')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const names = name.split(' ')

          // todo: 根据names查找ast template对应的所有节点添加unocss attributes，并删除原本class中的对应样式
          return all
        },
      )
    }
  }

  return code
}

export function astFindTag(ast: any, tag = '', result: any = []) {
  const selector = tag.startsWith('.')
    ? 'class'
    : tag.startsWith('#')
      ? 'id'
      : ''
  if (selector) {
    if (
      ast.props
      && ast.props.length
      && ast.props.some(
        (prop: any) =>
          prop.name === selector && prop.source?.includes(tag.slice(1)),
      )
    )
      result.push(ast)
  }
  else if (ast.tag === tag) {
    result.push(ast)
  }
  if (ast.children && ast.children.length)
    ast.children.forEach((child: any) => astFindTag(child, tag, result))
  return result
}
