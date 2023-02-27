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
          const after = transformStyleToUnocss(before) || before
          // 未被转换跳过
          if (before === after)
            return
          // 找template > ast
          name = name.replace(/\s+/g, '')
          const stack = template.ast
          const names = name.split(' ')

          // todo: 根据names查找ast template对应的所有节点添加unocss attributes，并删除原本class中的对应样式
          const result = fn1(names, stack)
          result.forEach((r) => {
            const {
              loc: { source },
              tag,
            } = r
            code = code.replace(
              source,
              source.replace(`<${tag}`, `<${tag} ${after}`),
            )
          })
          // 删除原本class
          code = code.replace(value, '')
          // 如果class中内容全部被移除删除这个定义的class
          code = code.replace(/[\w>.#-+> ]+\s*{}\n/g, '')

          return all
        },
      )
    }
  }

  return code
}

function fn(
  list: any[],
  stack: any,
  deps = Infinity,
  targets: any = undefined,
  result: any[] = [],
) {
  for (let j = 0; j < list.length; j++) {
    const curFirst = list[j]
    if (targets) {
      targets.forEach((t: any) => fn(list.slice(j), t, deps, undefined, result))
      continue
    }

    targets = astFindTag(stack, curFirst, deps)
    if (list.length === 1) {
      result.push(...targets)
      return
    }
  }
  return result
}

function fn1(
  list: any[],
  stack: any,
  targets: any = undefined,
  result: any[] = [],
) {
  for (let i = 0; i < list.length; i++) {
    const cur = list[i]
    const curs = cur.split('>')
    if (targets) {
      targets.forEach((t: any) => fn1(list.slice(i), t, undefined, result))
      continue
    }
    targets = curs.length > 1 ? fn(curs, stack, 1) : astFindTag(stack, cur)

    if (list.length === 1) {
      result.push(...targets)
      return result
    }
  }
  return result
}

export function astFindTag(
  ast: any,
  tag = '',
  deps = Infinity,
  result: any = [],
) {
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
          prop.name === selector && prop.value.content?.includes(tag.slice(1)),
      )
    )
      result.push(ast)
  }
  else if (ast.tag === tag) {
    result.push(ast)
  }

  if (ast.children && ast.children.length && deps) {
    deps--
    ast.children.forEach((child: any) => astFindTag(child, tag, deps, result))
  }
  return result
}
