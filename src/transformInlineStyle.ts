import { transformStyleToUnocss } from './transformStyleToUnocss'

const styleReg = /<([\w\-_]+)[^>]*[^:]style="([^"]+)"[^>]*>/g

const removeStyleReg = / style="([#\w\:\-\s;\[\]\/\+%]+)"/
export function transformInlineStyle(code: string, isJsx?: boolean): string {
  // todo: 如果存在未能被转换的style应该返回并保持部分的style
  code.replace(styleReg, (target, tag, inlineStyle) => {
    const [after, noMap] = transformStyleToUnocss(inlineStyle)

    // transform inline-style

    if (isJsx) {
      const newReg = new RegExp(`<${tag}.*class="(.*)"[=\\w\\-\\_'"\\s]*\/?>`)
      const matcher = target.match(newReg)

      if (matcher) {
        return (code = code.replace(
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

      return (code = code.replace(
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

    return (code = code.replace(
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

  return code
}
