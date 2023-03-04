import { parse } from 'vue/compiler-sfc'
import { trim } from './utils'
import { tail } from './tail'
import { transformStyleToUnocss } from '.'
const combineReg = /([.#\w]+)([.#][\w]+)/ // xx.xx

const addReg = /([.#\w]+)\s*\+\s*([.#\w]+)/ // xx + xx
const tailReg = /:([\w-\(\)]+)/ // :after
const tagReg = /\[([\w-]*)[='" ]*([\w-]*)['" ]*\]/ // [class="xxx"]

const emptyClass = /[\w>.#\-\+>:\[\]="' ]+\s*{}\n/g
interface AllChange {
  before: string
  after: string
  name: string
  source: string
  tag: string
  media: string
}

export function transformCss(style: string, code: string, media = '') {
  let stack = parse(code).descriptor.template?.ast
  const allChanges: AllChange[] = []

  style.replace(
    /(.*){([\\n\s\w\-.:;%\(\)\+'"!]*)}/g,
    (all: any, name: any, value: any = '') => {
      name = trim(name.replace(/\s+/g, ' '))
      const before = trim(value.replace(/\n/g, ''))
      const transfer = transformStyleToUnocss(before)
      const tailMatcher = name.match(tailReg)

      const prefix = tailMatcher ? tail(tailMatcher[1]) : ''
      const after
        = prefix && transfer
          ? `${prefix}="${transfer.replace(/="\[(.*)\]"/g, (_, v) => `-${v}`)}"`
          : transfer ?? before
      // 未被转换跳过
      if (before === after)
        return
      if (prefix)
        name = name.slice(0, `-${tailMatcher[0].length}`)
      // 找template > ast
      const names = name.replace(/\s*\+\s*/, '+').split(' ')
      const result = findDeepChild(names, stack)

      if (!result.length)
        return
      result.forEach((r) => {
        const {
          loc: { source },
          tag,
        } = r

        // todo: 如果存在相同的属性根据css权重来进行替换
        allChanges.push({
          before,
          after,
          name: names[0],
          source,
          tag,
          media,
        })

        // code = code.replace(
        //   source,
        //   source.replace(
        //     `<${tag}`,
        //     `<${tag} ${media ? `${media}="${after}"` : after}`,
        //   ),
        // )
      })
      // 删除原本class
      code = code.replace(value, '')

      // 如果class中内容全部被移除删除这个定义的class
      code = code.replace(emptyClass, '')

      // update stack
      stack = parse(code).descriptor!.template!.ast
      return all
    },
  )
  // todo: resolveConflictClass

  return resolveConflictClass(allChanges, code)
}

// 查找下一级的
function findChild(
  list: any[],
  stack: any,
  deps = Infinity,
  targets: any = undefined,
  result: any[] = [],
) {
  for (let j = 0; j < list.length; j++) {
    const curFirst = list[j]
    if (targets) {
      targets.forEach((t: any) =>
        findChild(list.slice(j), t, deps, undefined, result),
      )
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
function findDeepChild(
  list: any[],
  stack: any,
  targets: any = undefined,
  result: any[] = [],
) {
  for (let i = 0; i < list.length; i++) {
    const cur = list[i]
    const curs = cur.split('>')
    if (targets) {
      targets.forEach((t: any) =>
        findDeepChild(list.slice(i), t, undefined, result),
      )
      continue
    }
    const combineMatch = cur.match(combineReg)
    const addMatch = cur.match(addReg)

    targets
      = curs.length > 1
        ? findChild(curs, stack, 1)
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
  const tagMatch = tag.match(tagReg)

  const selector = tagMatch
    ? tagMatch[2]
      ? tagMatch[1]
      : tagMatch[1]
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
          && ((tagMatch && !tagMatch[0].indexOf('=') && !tagMatch[2])
            || prop.value?.content
              === (tagMatch && tagMatch[2] ? tagMatch[2] : tag.slice(1))),
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
            sib !== ast
            && sib.props
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
          sib !== ast
          && sib.props
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

// 查找是否存在冲突样式按照names
function resolveConflictClass(allChange: AllChange[], code: string) {
  const changes = findSameSource(allChange)
  return Object.keys(changes).reduce((result, key) => {
    const value = changes[key]
    const { tag, media } = value[0]
    const after = getConflictClass(value)
    return result.replace(
      key,
      key.replace(
        `<${tag}`,
        `<${tag} ${media ? `${media}="${after}"` : after}`,
      ),
    )
  }, code)
}

function calculateWeight(c: string) {
  // todo: 目前计算有问题，后续改进
  let num = 0
  c.replace(/#\w+/g, () => {
    num += 100
    return ''
  })
  c.replace(/.\w+/, () => {
    num += 10
    return ''
  })
  c.replace(/^\w+/, () => {
    num += 10
    return ''
  })
  c.replace(/\[[\w\s='"-]+\]/g, () => {
    num += 10
    return ''
  })
  c.replace(/:\w+/g, () => {
    num += 1
    return ''
  })
  return num
}

function findSameSource(allChange: AllChange[]) {
  const result: any = {}
  allChange.forEach((item) => {
    const { source } = item
    if (!result[source])
      result[source] = []
    result[source].push(item)
  })
  return result
}

function getConflictClass(allChange: AllChange[]) {
  const map: Record<string, Array<number | string>> = {}

  allChange.forEach((item) => {
    const { before, name } = item
    const data = before
      .split(';')
      .filter(Boolean)
      .map(i => i.split(':'))

    data.forEach((item) => {
      const [key, value] = item
      if (!map[key]) {
        map[key] = [calculateWeight(name), value]
      }
      else {
        const [preWeight] = map[key]
        const curWeight = calculateWeight(name)
        if (+curWeight > +preWeight)
          map[key] = [+curWeight, value]
      }
    })
  })
  return Object.keys(map).reduce((result, key) => {
    const transferCss = transformStyleToUnocss(`${key}:${map[key][1]}`)
    return `${result}${transferCss} `
  }, '')
}
