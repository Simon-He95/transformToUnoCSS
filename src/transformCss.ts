import fsp from 'fs/promises'
import path from 'path'
import { parse } from 'vue/compiler-sfc'
import {
  diffTemplateStyle,
  flag,
  getCssType,
  getStyleScoped,
  isEmptyStyle,
  isNot,
  joinWithUnderLine,
  transformUnocssBack,
  trim,
} from './utils'
import { tail } from './tail'
import { transformStyleToUnocss } from './transformStyleToUnocss'
import { transformVue } from './transformVue'
import { wrapperVueTemplate } from './wrapperVueTemplate'
import { compilerCss } from './compilerCss'
const combineReg = /([.#\w]+)([.#][\w]+)/ // xx.xx

const addReg = /([.#\w]+)\s*\+\s*([.#\w]+)/ // xx + xx
const tailReg = /:([\w-\(\)]+)/ // :after
const tagReg = /\[([\w-]*)[='" ]*([\w-]*)['" ]*\]/ // [class="xxx"]

const emptyClass = /[\w>\.\#\-\+>\:\[\]\="'\s\(\)]+\s*{}\n/g
interface Position {
  column: number
  line: number
  offset: number
}
interface AllChange {
  before: string
  after: string
  name: string
  source: string
  tag: string
  prefix: string
  attr: string[]
  media: string
  start: Position
  end: Position
}

export async function transformCss(
  style: string,
  code: string,
  media = '',
  isJsx?: boolean,
  filepath?: string,
): Promise<string> {
  const allChanges: AllChange[] = []
  code = (await importCss(code, style, filepath, isJsx)) as string
  let stack = parse(code).descriptor.template?.ast
  style.replace(
    /(.*){([#\\n\s\w\-.:;,%\(\)\+'"!]*)}/g,
    (all: any, name: any, value: any = '') => {
      name = trim(name.replace(/\s+/g, ' '))

      const originClassName = name
      const before = trim(value.replace(/\n\s*/g, ''))
      const transfer = transformStyleToUnocss(before)[0]
      const tailMatcher = name.match(tailReg)

      const prefix = tailMatcher
        ? (name.endsWith(tailMatcher[0]) ? '' : 'group-') + tail(tailMatcher[1])
        : ''

      const after
        = prefix && transfer
          ? `${prefix}="${transfer.replace(/="\[(.*)\]"/g, (_, v) => `-${v}`)}"`
          : transfer ?? before
      // 未被转换跳过
      if (before === after)
        return

      if (prefix)
        name = name.replace(tailMatcher[0], '')
      // 找template > ast
      const names = name.replace(/\s*\+\s*/, '+').split(' ')

      const result = findDeepChild(names, stack)

      if (!result.length)
        return

      result.forEach((r) => {
        const parent = r.parent
        if (prefix.startsWith('group-') && parent) {
          // 给result的parent添加class="group"
          const hasClass = parent.props.find((i: any) => i.name === 'class')
          if (hasClass) {
            // 如果有class
            const index = hasClass.value.loc.start.offset
            code = `${code.slice(0, index + 1)}group ${code.slice(index + 1)}`
          }
          else {
            const index = parent.loc.start.offset + parent.tag.length + 1
            code = `${code.slice(0, index)} class="group" ${code.slice(index)}`
          }
        }

        const {
          loc: { source, start, end },
          tag,
          props,
        } = r

        const attr = props.reduce((result: string[], cur: any) => {
          let item
          // eslint-disable-next-line no-cond-assign
          if (cur.name === 'class' && (item = cur.value?.content))
            result.push(item)
          else if (!cur.value)
            result.push(cur.name)

          return result
        }, [] as string[])

        allChanges.push({
          before,
          after,
          name: originClassName,
          source,
          tag,
          attr,
          prefix,
          media,
          start,
          end,
        })
      })
      // 拿出class
      const _class = code.match(/<style[^>]+>(.*)<\/style>/s)![1]

      // 删除原本class
      let newClass = _class.replace(value, '')

      // 如果class中内容全部被移除删除这个定义的class
      newClass = newClass.replace(emptyClass, '')

      code = code.replace(_class, newClass)

      // update stack
      stack = parse(code).descriptor!.template!.ast
      return all
    },
  )

  return await resolveConflictClass(allChanges, code, isJsx)
}

async function importCss(
  code: string,
  style: string,
  filepath?: string,
  isJsx?: boolean,
) {
  const originCode = code
  for await (const match of style.matchAll(
    /@import (url\()?["']*([\w.\/\-\_]*)["']*\)?;/g,
  )) {
    if (!match)
      continue
    const url = path.resolve(filepath!, '..', match[2])

    const content = await fsp.readFile(
      path.resolve(filepath!, '..', url),
      'utf-8',
    )
    const type = getCssType(url)
    const css = await compilerCss(content, type)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, beforeStyle] = code.match(/<style.*>(.*)<\/style>/s)!
    code = code.replace(beforeStyle, '')

    const vue = wrapperVueTemplate(code, css)

    const transfer = await transformVue(vue, isJsx)

    if (diffTemplateStyle(transfer, vue)) {
      code = originCode
      continue
    }
    // 如果<style scoped>为空全部转换删除@import

    if (isEmptyStyle(transfer)) {
      code = wrapperVueTemplate(transfer, beforeStyle.replace(match[0], ''))
      continue
    }
    // 否则剩余的生成新的@import css
    const restStyle = getStyleScoped(transfer)

    fsp.writeFile(
      url.replace(`.${type}`, `${flag}.${type}`),
      restStyle,
      'utf-8',
    )

    code = wrapperVueTemplate(
      transfer.replace(/<style scoped>.*<\/style>/s, ''),
      beforeStyle,
    )
    continue
  }
  return code
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
    if (cur === '>')
      continue
    const curs = cur.split('>')
    if (targets) {
      result.length = 0
      targets.forEach((t: any) =>
        findDeepChild(list.slice(i), t, undefined, result),
      )
      const hasOrigin = result.findIndex(item => item === targets[0])
      if (hasOrigin !== -1)
        result.splice(hasOrigin, 1)
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
  return sort(result)
}

function sort(data: any[]) {
  const result: any[] = []
  data.forEach((item) => {
    if (
      !result.some(
        k =>
          k.loc.start.offset === item.loc.start.offset
          && k.loc.end.offset === item.loc.end.offset,
      )
    )
      result.push(item)
  })
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
  // type: 3 是注释
  if (ast.type === 3)
    return result

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
              .split(' ')
              .includes(tagMatch && tagMatch[2] ? tagMatch[2] : tag.slice(1))),
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
    ast.children.forEach((child: any) => {
      child.parent = ast
      astFindTag(child, tag, deps, combine, add, result, ast.children)
    })
  }
  return result
}

// 查找是否存在冲突样式按照names
async function resolveConflictClass(
  allChange: AllChange[],
  code: string,
  isJsx?: boolean,
) {
  const changes = findSameSource(allChange)
  let result = code
  for await (const key of Object.keys(changes)) {
    const value = changes[key]
    const {
      tag,
      prefix,
      media,
      source,
      start: { offset },
    } = value[0]
    // eslint-disable-next-line prefer-const
    let [after, transform] = await getConflictClass(value)
    if (!after)
      continue

    result = transform(result)
    const target = transform(source)
    if (media)
      after = `${media}:${after}`
    if (prefix) {
      if (isNot(prefix)) {
        const match = target.match(/<[^>]*(class="[^"]+)[^>]*/)
        if (match) {
          // 将class合并
          after = after.replace(
            /class="(\[&:not\([\w\s\-\_\.\#]+\)\]:[\w\-\.]+)"\s*/,
            (_, v) => {
              result = result.replace(match[1], `${match[1]} ${v}`)
              return ''
            },
          )
        }
      }
      else {
        after = after.replace(/="\[/g, '-"[')
      }
    }

    const returnValue = isJsx
      ? after
        .replace(/\[(.*)\]/g, (all, v) =>
          all.replace(v, joinWithUnderLine(v)),
        )
        .replace(/="([\w\-\,.\(\)\+\_\s#]+)"/g, '-$1')
      : after
    const start = result.slice(offset)

    if (isJsx) {
      const newReg = new RegExp(
        `<${tag}.*class="([\\w\\:\\-\\s;\\[\\]\\/\\+%]+)"[=\\w\\-\\_'"\\s:]*\/?>`,
      )
      const matcher = target.match(newReg)

      if (matcher) {
        result = result.replace(
          start,
          start.replace(
            `class="${matcher[1]}"`,
            `class="${matcher[1]} ${returnValue}"`,
          ),
        )
        continue
      }

      result = result.replace(
        start,
        start.replace(`<${tag}`, `<${tag} class="${returnValue}"`),
      )
      continue
    }

    result = result.replace(
      start,
      start.replace(`<${tag}`, `<${tag} ${returnValue}`),
    )
  }

  return result
}

function calculateWeight(c: string) {
  const data = c.split(' ').filter(i => i !== '+' && i !== '>')
  let num = 0

  data.forEach((item) => {
    item.replace(/#\w+/g, () => {
      num += 100
      return ''
    })
    item.replace(/.\w+/, () => {
      num += 10
      return ''
    })
    item.replace(/^\w+/, () => {
      num += 10
      return ''
    })
    item.replace(/\[[\w\s='"-]+\]/g, () => {
      num += 10
      return ''
    })
    item.replace(/:\w+/g, () => {
      num += 1
      return ''
    })
  })

  return num
}

function findSameSource(allChange: AllChange[]) {
  const result: any = {}
  allChange.forEach((item) => {
    const { source, start, end } = item
    const key = `${source}:${start.offset}:${end.offset}`
    if (!result[key])
      result[key] = []
    result[key].push(item)
  })
  return result
}

async function getConflictClass(
  allChange: AllChange[],
): Promise<[string, (code: string) => string]> {
  const map: Record<string, Array<number | string>> = {}
  let transform = (code: string) => code
  for await (const item of allChange) {
    const { before, name, source, attr, after, prefix, media } = item
    const pre = prefix ? `${prefix}|` : ''
    const beforeArr = before.split(';').filter(Boolean)
    const data = beforeArr.map((item) => {
      const [key, value] = item.split(':')
      return [`${pre}${key}`, value]
    })
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

    // map如果已存在内联转换的unocss且为相同属性的判断是否需要删除
    if (attr) {
      const res = (await transformUnocssBack(
        attr.map((i) => {
          if (prefix)
            return `${prefix}="${i}"`
          if (media)
            return `${media}:${i}`
          return i
        }),
      )) as any[]
      Object.keys(map).forEach((i) => {
        const index = res.findIndex(r => r === i)
        if (index !== -1) {
          const inline = item.attr[index]

          if (inline.endsWith('!') || !after.endsWith('!')) {
            // 需要删除
            return delete map[i]
          }
          else {
            // 不需要删除，移除原本的inlineStyle的转换后的结果
            transform = (code: string) =>
              code.replace(source, source.replace(` ${inline}`, ''))
          }
        }
      })
    }
  }

  return [
    Object.keys(map)
      .reduce((result, key) => {
        const keys = key.split('|')
        const prefix = keys.length > 1 ? keys[0] : ''
        let transferCss = transformStyleToUnocss(`${key}:${map[key][1]}`)[0]
        const match = transferCss.match(/(.*)="\[(.*)\]"/)
        if (match)
          transferCss = `${match[1]}-${joinWithUnderLine(match[2])}`

        const _transferCss = prefix
          ? isNot(prefix)
            ? `class="${prefix}${transferCss.replace(
                /="\[(.*)\]"/g,
                (_, v) => `-${v}`,
              )}"`
            : `${prefix}="${transferCss.replace(
                /="\[(.*)\]"/g,
                (_, v) => `-${v}`,
              )}"`
          : transferCss
        // 如果存在相同的prefix, 进行合并
        if (prefix && result.includes(prefix)) {
          if (isNot(prefix)) {
            const newPrefix = prefix.replace(/[\[\]\(\)]/g, all => `\\${all}`)
            const reg = new RegExp(`${newPrefix}([\\w\\:\\-;\\[\\]\\/\\+%]+)`)
            return result.replace(reg, all => `${all}:${transferCss}`)
          }
          const reg = new RegExp(`${prefix}="([\\w\\:\\-\\s;\\[\\]\\/\\+%]+)"`)
          return result.replace(reg, (all, v) =>
            all.replace(v, `${v} ${transferCss}`),
          )
        }

        return `${result}${_transferCss} `
      }, '')
      .trim(),
    transform,
  ]
}
