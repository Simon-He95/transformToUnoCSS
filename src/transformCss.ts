import fsp from 'node:fs/promises'
import path from 'node:path'
import { escapeRegExp } from '@unocss/core'
import {
  isNot,
  joinWithUnderLine,
  transformStyleToUnocss,
  transformStyleToUnocssPre,
  trim,
} from 'transform-to-unocss-core'
import { compilerCss } from './compilerCss'
import { nodeHtmlParser } from './node-html-parser'
import { tail } from './tail'
import { transformVue } from './transformVue'
import {
  diffTemplateStyle,
  getCssType,
  getStyleScoped,
  getVueCompilerSfc,
  isEmptyStyle,
  TRANSFER_FLAG,
  transformUnocssBack,
} from './utils'
import { wrapperVueTemplate } from './wrapperVueTemplate'

const tailReg = /:?:(.+)/ // :after
const emptyClass = /[,\w>.#\-+:[\]="'\s()]+\{\}\n/g

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

let isRem: boolean | undefined
export async function transformCss(
  style: string,
  code: string,
  media = '',
  isJsx = true,
  filepath?: string,
  _isRem?: boolean,
  debug = false,
): Promise<string> {
  isRem = _isRem
  const allChanges: AllChange[] = []
  const { parse } = await getVueCompilerSfc()
  let newCode = (await importCss(code, style, filepath, isJsx, debug)) as string

  if (debug) {
    console.log(
      '[DEBUG] transformCss started:',
      JSON.stringify(
        {
          filepath,
          media,
          isJsx,
          styleLength: style.length,
          codeLength: code.length,
        },
        null,
        2,
      ),
    )
  }
  const stack = parse(newCode).descriptor.template?.ast
  const updateOffsetMap: any = {}
  const deferRun: any[] = []
  style.replace(
    /(.*)\{([#\\\s\w\-.:;,%()+'"!]*)\}/g,
    (all: any, name: any, value: any = '') => {
      name = trim(name.replace(/\s+/g, ' '))

      const originClassName = name
      const before = trim(value.replace(/\n\s*/g, ''))

      if (debug) {
        console.log(
          '[DEBUG] Processing CSS rule:',
          JSON.stringify(
            {
              originClassName,
              before,
              all,
            },
            null,
            2,
          ),
        )
      }

      const [transfer, noTransfer] = transformStyleToUnocss(before, isRem)

      if (debug) {
        console.log(
          '[DEBUG] CSS transform result:',
          JSON.stringify(
            {
              originClassName,
              before,
              transfer,
              noTransfer: noTransfer?.length || 0,
            },
            null,
            2,
          ),
        )
      }
      const tailMatcher = name.match(tailReg)

      const prefix = tailMatcher
        ? (name.endsWith(tailMatcher[0]) ? '' : 'group-') + tail(tailMatcher[1])
        : ''
      // :deep()
      if (prefix === 'group-deep')
        return

      // hover .xxx 这种没办法处理因为 tailwind 只支持 hover:[&:xxx] 在当前的元素下
      if (prefix.includes(' '))
        return

      const after
        = prefix && transfer
          ? `${prefix}="${transfer.replace(
            /="\[([^\]]*)\]"/g,
            (_: string, v: string) => `-[${v}]`,
          )}"`
          : (transfer ?? before)
      // 未被转换跳过
      if (before === after) {
        if (debug) {
          console.log(
            '[DEBUG] CSS rule skipped - no transformation:',
            JSON.stringify({ originClassName, before }, null, 2),
          )
        }
        return
      }

      if (prefix)
        name = name.replace(tailMatcher[0], '')

      // 找template > ast
      const result = nodeHtmlParser(newCode, originClassName, stack?.children)

      if (!result.length) {
        if (debug) {
          console.log(
            '[DEBUG] No HTML elements found for CSS rule:',
            JSON.stringify({ originClassName, name }, null, 2),
          )
        }
        return
      }

      if (debug) {
        console.log(
          '[DEBUG] Found HTML elements for CSS rule:',
          JSON.stringify(
            {
              originClassName,
              elementsCount: result.length,
              elements: result.map(r => ({
                tag: r.tag,
                start: r.loc.start.offset,
              })),
            },
            null,
            2,
          ),
        )
      }

      // 拿出class
      const _class = newCode.match(/<style[^>]+>(.*)<\/style>/s)![1]
      // 删除原本class
      let newClass = _class.replace(all, _ =>
        _.replace(value, noTransfer.join(';')))

      // 如果class中内容全部被移除删除这个定义的class
      newClass = newClass.replace(emptyClass, '')
      newCode = newCode.replace(_class, newClass)

      for (const r of result) {
        const parent = r.parent
        if (prefix.startsWith('group-') && parent) {
          // 给result的parent添加class="group"
          const hasClass = parent.props.find((i: any) => i.name === 'class')
          if (hasClass) {
            if (hasClass.value.content.includes('group'))
              return
            // 如果有class
            const index = hasClass.value.loc.start.offset
            const newIndex
              = hasClass.value.loc.start.offset
                + getCalculateOffset(updateOffsetMap, index)
            const updateText = 'group '
            updateOffsetMap[index] = updateText.length
            hasClass.value.content = `${hasClass.value.content} ${updateText}`
            newCode = `${newCode.slice(0, newIndex + 1)}${updateText}${newCode.slice(
              newIndex + 1,
            )}`
          }
          else {
            const index = parent.loc.start.offset + parent.tag.length + 1
            const newIndex
              = hasClass.value.loc.start.offset
                + getCalculateOffset(updateOffsetMap, index)
            const updateText = 'class="group" '
            parent.props.push({
              type: 6,
              name: 'class',
              value: {
                type: 2,
                content: 'group',
                loc: {
                  start: {
                    column: 0,
                    line: 0,
                    offset: newIndex,
                  },
                  end: {
                    column: 0,
                    line: 0,
                    offset: newIndex + updateText.length,
                  },
                },
              },
              loc: {
                start: {
                  column: 0,
                  line: 0,
                  offset: newIndex,
                },
                end: {
                  column: 0,
                  line: 0,
                  offset: newIndex + updateText.length,
                },
              },
            })
            updateOffsetMap[index] = updateText.length
            newCode = `${newCode.slice(0, newIndex)}${updateText}${newCode.slice(
              newIndex,
            )}`
          }
        }

        const {
          loc: { start, end },
          tag,
          props,
        } = r

        const attr = props.reduce((result: string[], cur: any) => {
          let item

          if (cur.name === 'class' && (item = cur.value?.content))
            result.push(item)
          else if (!cur.value)
            result.push(cur.name)

          return result
        }, [] as string[])

        // 运行完后执行
        deferRun.push(() => {
          const newIndex = getCalculateOffset(updateOffsetMap, start.offset)
          const newSource = newCode.slice(
            start.offset + newIndex,
            end.offset + newIndex,
          )
          allChanges.push({
            before,
            after,
            name: originClassName,
            source: newSource,
            tag,
            attr,
            prefix,
            media,
            start,
            end,
          })
        })
      }

      return all
    },
  )
  deferRun.forEach(run => run())

  if (debug) {
    console.log(
      '[DEBUG] transformCss finished, resolving conflicts:',
      JSON.stringify(
        {
          allChangesCount: allChanges.length,
        },
        null,
        2,
      ),
    )
  }

  return await resolveConflictClass(
    allChanges,
    newCode,
    isJsx,
    updateOffsetMap,
    debug,
  )
}

async function importCss(
  code: string,
  style: string,
  filepath?: string,
  isJsx?: boolean,
  debug = false,
) {
  if (debug) {
    console.log(
      '[DEBUG] importCss started:',
      JSON.stringify(
        {
          filepath,
          styleLength: style.length,
          hasImports: /@import/.test(style),
        },
        null,
        2,
      ),
    )
  }

  const originCode = code
  for await (const match of style.matchAll(
    /@import (url\()?["']*([\w./\-]*)["']*\)?;/g,
  )) {
    if (!match)
      continue

    if (debug) {
      console.log(
        '[DEBUG] Processing CSS import:',
        JSON.stringify({ importUrl: match[2] }, null, 2),
      )
    }

    const url = path.resolve(filepath!, '..', match[2])

    const content = await fsp.readFile(
      path.resolve(filepath!, '..', url),
      'utf-8',
    )
    const type = getCssType(url)
    const css = await compilerCss(content, type)

    const [_, beforeStyle] = code.match(/<style.*>(.*)<\/style>/s)!
    code = code.replace(beforeStyle, '')

    const vue = wrapperVueTemplate(code, css)

    const transfer = await transformVue(vue, { isJsx, isRem })

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
      url.replace(`.${type}`, `${TRANSFER_FLAG}.${type}`),
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

// 查找是否存在冲突样式按照names
async function resolveConflictClass(
  allChange: AllChange[],
  code: string,
  isJsx: boolean = true,
  updateOffset: Record<number, number>,
  debug = false,
) {
  if (debug) {
    console.log(
      '[DEBUG] resolveConflictClass started:',
      JSON.stringify(
        {
          allChangesCount: allChange.length,
          isJsx,
        },
        null,
        2,
      ),
    )
  }

  const changes = findSameSource(allChange)
  let result = code

  if (debug) {
    console.log(
      '[DEBUG] Found conflict groups:',
      JSON.stringify(
        {
          groupsCount: Object.keys(changes).length,
          groups: Object.keys(changes).map(key => ({
            key,
            changesCount: changes[key].length,
          })),
        },
        null,
        2,
      ),
    )
  }

  for await (const key of Object.keys(changes)) {
    const value = changes[key]
    const {
      tag,
      prefix,
      media,
      source,
      start: { offset },
      end: { offset: offsetEnd },
    } = value[0]

    let [after, transform] = await getConflictClass(value, debug)
    if (!after) {
      if (debug) {
        console.log('[DEBUG] No conflict resolution needed for group:', key)
      }
      continue
    }

    if (debug) {
      console.log(
        '[DEBUG] Conflict resolved for group:',
        JSON.stringify(
          {
            key,
            after,
            originalSource: source,
          },
          null,
          2,
        ),
      )
    }

    const newResult = transform(result)
    result = newResult
    const target = transform(source)
    if (media)
      after = `${media}:${after}`
    if (prefix) {
      if (isNot(prefix)) {
        const match = target.match(/<[^>]*(class="[^"]+)[^>]*/)
        if (match) {
          // 将class合并
          after = after.replace(
            /class="(\[&:not\([\w\s\-.#]+\)\]:[\w\-.]+)"\s*/,
            (_, v) => {
              const updateText = ` ${v}`
              result = result.replace(match[1], `${match[1]}${updateText}`)
              return ''
            },
          )
        }
      }
      else {
        after = after.replace(/="\[/g, '-"[')
      }
    }

    // 默认全部都输出到class中
    const returnValue
      = isJsx
        || after.replace(/(?:[\w\-]+|\[[^\]]+\])=("{1})(.*?)\1/g, '').includes('[')
        ? after
            .replace(/\[([^\]]+)\]/g, (all, v) =>
              all.replace(v, joinWithUnderLine(v)))
            .replace(/-(rgba?([^)]+))/g, '-[$1]')
            .replace(
              /((?:[\w\-]+|\[[^\]]+\])(?::[\w\-]+|-\[[^\]]*\])*)=(['"]{1})(.*?)\2/g,
              (_all, prefix, _, content) => {
                // 拆分 content 中的空格，但是要忽略 ( ) [] 中的空格, 然后用 prefix 连接
                const splitContent: string[] = content
                  .split(/(?<!\[[^\]]*)\s+/)
                  .filter(Boolean)

                return splitContent.map(item => `${prefix}-${item}`).join(` `)
              },
            )
        : after

    // (["]{1})(.*?)\1
    const getUpdateOffset = getCalculateOffset(updateOffset, offset)
    const startOffset = offset + getUpdateOffset
    const endOffset = offsetEnd + getUpdateOffset
    const start = result.slice(startOffset, endOffset)

    if (isJsx || after.replace(/[\w\-]+=("{1})(.*?)\1/g, '').includes('[')) {
      const newReg = new RegExp(
        `^<${tag}(?:[^\/'">]|"[^"]*"|'[^']*')*[^:]class=["']([^"']+)["']([^\/'">]|"[^"]*"|'[^']*')*\/?>`,
        's',
      )
      const matcher = target.match(newReg)

      if (matcher) {
        // updateText
        const insertText = ` ${returnValue}`
        result
          = result.slice(0, startOffset)
            + start.replace(
              `class="${matcher[1]}"`,
              `class="${matcher[1]}${insertText}"`,
            )
            + result.slice(endOffset)
        updateOffset[offset] = insertText.length
        continue
      }

      const insertText = ` class="${returnValue}"`
      result
        = result.slice(0, startOffset)
          + start.replace(`<${tag}`, `<${tag}${insertText}`)
          + result.slice(endOffset)
      updateOffset[offset] = insertText.length

      continue
    }

    result
      = result.slice(0, startOffset)
        + start.replace(`<${tag}`, `<${tag} ${returnValue}`)
        + result.slice(endOffset)
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

const skipTransformFlag = Symbol('skipTransformFlag')
async function getConflictClass(
  allChange: AllChange[],
  debug = false,
): Promise<[string, (code: string) => string]> {
  if (debug) {
    console.log(
      '[DEBUG] getConflictClass started:',
      JSON.stringify(
        {
          changesCount: allChange.length,
          changes: allChange.map(c => ({
            name: c.name,
            before: c.before,
            after: c.after,
          })),
        },
        null,
        2,
      ),
    )
  }

  let map: Record<string, Array<number | string | symbol>> = {}
  let transform = (code: string) => code
  for await (const item of allChange) {
    const { before, name, source, attr, after, prefix, media } = item
    const pre = prefix ? `${prefix}|` : ''
    const beforeArr = before.split(';').filter(Boolean)
    const data = beforeArr.map((item) => {
      const [key, value] = item.trim().split(':')
      return [`${pre}${key}`, value]
    })
    data.forEach((item) => {
      const [key, value] = item
      if (value === undefined)
        return
      if (!map[key]) {
        map[key] = [calculateWeight(name), value]
      }
      else {
        const [preWeight] = map[key] as any
        if (preWeight === skipTransformFlag)
          return
        const curWeight = calculateWeight(name)
        if (+curWeight >= +preWeight)
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
          if (inline?.endsWith('!') || !after?.endsWith('!')) {
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

  // 提前处理 map
  const joinMap = Object.keys(map)
    .map((key) => {
      const value = map[key][1] as string
      return `${key}:${value}`
    })
    .join(';')
  const { transformedResult, newStyle } = transformStyleToUnocssPre(joinMap)
  if (transformedResult) {
    // map 赋值新 newStyle
    map = newStyle.split(';').reduce(
      (acc: Record<string, Array<number | string | symbol>>, item: string) => {
        const [key, value] = item.trim().split(':')
        if (value !== undefined) {
          acc[key] = [map[key][0], value]
        }
        return acc
      },
      // 将 transformedResult 赋值给 map
      // map[]
      {},
    )
    map[transformedResult] = [1, skipTransformFlag]
  }
  return [
    Object.keys(map)
      .reduce((result, key) => {
        const keys = key.split('|')
        const styleKey = keys[keys.length - 1]
        let prefix = keys.length > 1 ? keys[0] : ''
        let transferCss
          = map[key][1] === skipTransformFlag
            ? key
            : transformStyleToUnocss(
              `${styleKey}:${map[key][1] as string}`,
              isRem,
            )[0]

        if (debug) {
          console.log(
            '[DEBUG] Processing map key:',
            JSON.stringify(
              {
                key,
                styleKey,
                prefix,
                transferCss,
                mapValue: map[key],
              },
              null,
              2,
            ),
          )
        }

        const match = transferCss.match(/(\S*)="\[([^\]]*)\]"/)
        if (match) {
          transferCss = `${match.input?.replace(
            match[0],
            match[0]
              .replace(/="\[([^\]]*)\]"/, (_: string, v: string) => `-[${v}]`)
              .replace(/="([^"]*)"/, '-$1'),
          )}`
        }

        // transferCss = `${match[1]}-${joinWithUnderLine(match[2])}`

        const _transferCss = prefix
          ? isNot(prefix)
            ? `class="${prefix}${transferCss
              .replace(
                /="\[([^\]]*)\]"/g,
                (_: string, v: string) => `-[${v}]`,
              )
              .replace(/="([^"]*)"/, '-$1')}"`
            : `${prefix}="${transferCss
              .replace(
                /="\[([^\]]*)\]"/g,
                (_: string, v: string) => `-[${v}]`,
              )
              .replace(/="([^"]*)"/, '-$1')}"`
          : transferCss
        // 如果存在相同的prefix, 进行合并

        if (!prefix) {
          const reg = /^(\S*)="[^"]*"$/
          if (reg.test(transferCss))
            prefix = transferCss.match(reg)![1]
        }

        if (prefix) {
          const prefixReg1 = new RegExp(
            `(?<!\\S)${escapeRegExp(prefix)}(?!\\S)`,
          )
          if (prefixReg1.test(result)) {
            return result.replace(prefixReg1, all =>
              all.replace(prefix, _transferCss))
          }
          const prefixReg2 = new RegExp(`(?<!\\S)${escapeRegExp(prefix)}=`)

          if (prefixReg2.test(result)) {
            if (isNot(prefix)) {
              const newPrefix = prefix.replace(/[[\]()]/g, all => `\\${all}`)
              const reg = new RegExp(
                `${escapeRegExp(newPrefix)}([\\w\\:\\-;\\[\\]\\/\\+%]+)`,
              )
              return result.replace(reg, all => `${all}:${transferCss}`)
            }
            const reg = new RegExp(`${escapeRegExp(prefix)}=(["]{1})(.*?)\\1`)
            return result.replace(reg, (all, _, v) => {
              const unique = [
                ...new Set(
                  v
                    .split(' ')
                    .concat(
                      _transferCss.slice(prefix.length + 2, -1).split(' '),
                    ),
                ),
              ].join(' ')
              if (v)
                return all.replace(v, unique)
              return `${prefix}="${unique.trim()}"`
            })
          }
        }
        return `${result}${_transferCss} `
      }, '')
      .trim(),
    transform,
  ]
}

function getCalculateOffset(offsetMap: any, offset: any) {
  return Object.keys(offsetMap).reduce((result, key) => {
    if (+key <= offset)
      result += offsetMap[key]

    return result
  }, 0)
}
