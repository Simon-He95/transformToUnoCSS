import { trim } from './utils'
import { tail } from './tail'
import { transformStyleToUnocss } from '.'
const combineReg = /([.#\w]+)([.#][\w]+)/

const addReg = /([.#\w]+)\s*\+\s*([.#\w]+)/
const tailReg = /:([\w-\(\)]+)/

export function transformCss(
  style: string,
  code: string,
  stack: any,
  transformFn: (source: string) => string,
  media = '',
) {
  style.replace(
    /(.*){([\\n\s\w\-.:;%\(\)\+'"]*)}/g,
    (all: any, name: any, value: any) => {
      name = trim(name.replace(/\s+/g, ' '))

      const before = trim(value.replaceAll('\n', ''), 'all')
      const transfer = transformStyleToUnocss(before)
      const tailMatcher = name.match(tailReg)
      const prefix = tailMatcher ? tail(tailMatcher[1]) : ''
      const after
        = prefix && transfer
          ? `${prefix}="${transfer.replace(/=\[/g, '-[')}"`
          : transfer ?? before
      // 未被转换跳过
      if (before === after)
        return
      if (prefix)
        name = name.slice(0, `-${tailMatcher[0].length}`)
      // 找template > ast
      const names = name.replace(/\s*\+\s*/, '+').split(' ')

      // todo: 根据names查找ast template对应的所有节点添加unocss attributes，并删除原本class中的对应样式
      const result = fn1(names, stack)

      if (!result.length)
        return
      result.forEach((r) => {
        const {
          loc: { source },
          tag,
        } = r
        const transferSource = transformFn(source)

        code = code.replace(
          transferSource,
          transferSource.replace(
            `<${tag}`,
            `<${tag} ${media ? `${media}="${after}"` : after}`,
          ),
        )
      })
      // 删除原本class
      code = code.replace(value, '')

      // 如果class中内容全部被移除删除这个定义的class
      code = code.replace(/[\w>.#\-\+>:\[\] ]+\s*{}\n/g, '')

      return all
    },
  )

  return code
}

// 查找下一级的
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
    const combineMatch = curFirst.match(combineReg)
    const addMatch = curFirst.match(addReg)
    targets = combineMatch
      ? astFindTag(stack, combineMatch[1], deps, combineMatch[2])
      : addMatch
        ? astFindTag(stack, addMatch[2], deps, undefined, addMatch[1])
        : astFindTag(stack, curFirst, deps)
    if (list.length === 1) {
      result.push(...targets)
      return
    }
  }
  return result
}

// 查找下无限级的
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
    const combineMatch = cur.match(combineReg)
    const addMatch = cur.match(addReg)
    targets
      = curs.length > 1
        ? fn(curs, stack, 1)
        : combineMatch
          ? astFindTag(stack, combineMatch[1], Infinity, combineMatch[2])
          : addMatch
            ? astFindTag(stack, addMatch[2], Infinity, undefined, addMatch[1])
            : astFindTag(stack, cur, Infinity)

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
  combine: string | undefined = undefined,
  add: string | undefined = undefined,
  result: any = [],
  siblings: any = [],
) {
  const tagMatch = tag.match(/\[([\w-]+)\]/)

  const selector = tagMatch
    ? tagMatch[1]
    : tag.startsWith('.')
      ? 'class'
      : tag.startsWith('#')
        ? 'id'
        : ''
  const combineSelector = combine
    ? combine.startsWith('.')
      ? 'class'
      : combine.startsWith('#')
        ? 'id'
        : undefined
    : undefined
  const addSelector = add
    ? add.startsWith('.')
      ? 'class'
      : add.startsWith('#')
        ? 'id'
        : undefined
    : undefined
  if (selector) {
    if (
      ast.props
      && ast.props.length
      && ast.props.some(
        (prop: any) =>
          prop.name === selector
          && (tagMatch || prop.value.content?.includes(tag.slice(1))),
      )
      && (combine === undefined
        || ast.props.some(
          (prop: any) =>
            prop.name === combineSelector
            && prop.value.content?.includes(combine.slice(1)),
        ))
      && (add === undefined
        || siblings.some(
          (sib: any) =>
            sib.props
            && sib.props.length
            && sib.props.some(
              (prop: any) =>
                prop.name === addSelector
                && prop.value.content?.includes(add.slice(1)),
            ),
        ))
    )
      result.push(ast)
  }
  else if (
    ast.tag === tag
    && (combine === undefined
      || (ast.props
        && ast.props.length
        && ast.props.some(
          (prop: any) =>
            prop.name === combineSelector
            && (tagMatch || prop.value.content?.includes(combine.slice(1))),
        )))
    && (add === undefined
      || siblings.some(
        (sib: any) =>
          sib.props
          && sib.props.length
          && sib.props.some(
            (prop: any) =>
              prop.name === addSelector
              && prop.value.content?.includes(add.slice(1)),
          ),
      ))
  ) {
    result.push(ast)
  }

  if (ast.children && ast.children.length && deps) {
    deps--
    ast.children.forEach((child: any) =>
      astFindTag(child, tag, deps, combine, add, result, ast.children),
    )
  }
  return result
}
