import { transformStyleToUnocss } from './transformStyleToUnocss'

const styleReg = /<([\w\-_]+)[^>]*[^:]style="([^"]+)"[^>]*>/g

const removeStyleReg = / style="([#\w\:\-\s;\[\]\/\+%]+)"/
const templateReg = /^<template>(.*)<\/template>$/ms
const commentReg = /<!--.*-->/gs
export function transformInlineStyle(code: string, isJsx?: boolean): string {
  // code中提取template
  const match = code.match(templateReg)
  if (!match)
    return code
  let templateMatch = match[1]
  const commentMap: Record<string, string> = {}
  let count = 0
  const commentPrefix = '__commentMap__'
  templateMatch = templateMatch.replace(commentReg, (comment: string) => {
    count++
    commentMap[count] = comment
    return `${commentPrefix}${count}`
  })

  templateMatch.replace(styleReg, (target, tag, inlineStyle) => {
    const [after, noMap] = transformStyleToUnocss(inlineStyle)

    // transform inline-style

    if (isJsx) {
      const newReg = new RegExp(`<${tag}.*class="(.*)"[=\\w\\-\\_'"\\s]*\/?>`)
      const matcher = target.match(newReg)

      if (matcher) {
        return (templateMatch = templateMatch.replace(
          target,
          target
            .replace(removeStyleReg, '')
            .replace(
              `class="${matcher[1]}"`,
              noMap.length
                ? `class="${matcher[1]} ${after}" style="${noMap.join(';')}"`
                : `class="${matcher[1]} ${after}"`,
            ),
        ))
      }

      return (templateMatch = templateMatch.replace(
        target,
        target
          .replace(removeStyleReg, '')
          .replace(
            `<${tag}`,
            noMap.length
              ? `<${tag} class="${after}" style="${noMap.join(';')}`
              : `<${tag} class="${after}"`,
          ),
      ))
    }

    return (templateMatch = templateMatch.replace(
      target,
      target
        .replace(removeStyleReg, '')
        .replace(
          `<${tag}`,
          noMap.length
            ? `<${tag} ${after} style="${noMap.join(';')}"`
            : `<${tag} ${after}`,
        ),
    ))
  })

  // 还原注释
  Object.keys(commentMap).forEach((key) => {
    const commentKey = `${commentPrefix}${key}`
    const value = commentMap[key]
    templateMatch = templateMatch.replace(commentKey, value)
  })

  return code.replace(templateReg, `<template>${templateMatch}</template>`)
}
