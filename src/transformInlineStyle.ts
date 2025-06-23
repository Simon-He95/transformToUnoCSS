import { toUnocssClass, transformStyleToUnocss } from 'transform-to-unocss-core'

const styleReg = /<([\w\-]+)[^/>]*[^:]style="([^"]+)"[^>]*>/g
const removeStyleReg = / style=("{1})(.*?)\1/
const templateReg = /^<template>(.*)<\/template>$/ms
const commentReg = /<!--.*-->/gs
export function transformInlineStyle(
  code: string,
  isJsx?: boolean,
  isRem?: boolean,
  debug = false,
): string {
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
    const [after, noMap] = isJsx
      ? toUnocssClass(inlineStyle, isRem)
      : transformStyleToUnocss(inlineStyle, isRem, debug)
    // transform inline-style

    if (debug) {
      console.log(
        '[DEBUG] transformInlineStyle processing:',
        JSON.stringify(
          {
            tag,
            inlineStyle,
            after,
            noMapLength: noMap?.length || 0,
          },
          null,
          2,
        ),
      )
    }

    if (isJsx) {
      // (["]{1})(.*?)\1
      const newReg = new RegExp(`<${tag}.*\\sclass=(["']{1})(.*?)\\1`, 's')
      const matcher = target.match(newReg)

      if (matcher) {
        return (templateMatch = templateMatch.replace(
          target,
          target
            .replace(removeStyleReg, '')
            .replace(
              `class="${matcher[2]}"`,
              noMap.length
                ? `class="${matcher[2]} ${after}" style="${noMap.map(item => item && item.trim()).join(';')}"`
                : `class="${matcher[2]} ${after}"`,
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
              ? `<${tag} class="${after}" style="${noMap.map(item => item && item.trim()).join(';')}`
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
            ? `<${tag} ${after} style="${noMap.map(item => item && item.trim()).join(';')}"`
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
