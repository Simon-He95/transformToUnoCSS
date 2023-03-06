import { transformStyleToUnocss } from '.'

const styleReg
  = /<([\w\-]+).*(:)?style="([\w\:\-\s;\[\]\/\+%]+)"[\w=\-\_'"\s]*\/?>/

export function tansformInlineStyle(code: string, isJsx?: boolean): string {
  const match = code.match(styleReg)

  if (!match)
    return code
  const [target, tag, comma, inlineStyle] = match

  if (comma)
    return code

  // transform inline-style
  if (isJsx) {
    const newReg = new RegExp(`<${tag}.*class="(.*)"[=\\w\\-\\_'"\\s]*\/?>`)
    const matcher = target.match(newReg)
    if (matcher) {
      code = code.replace(
        target,
        target.replace(
          `class="${matcher[1]}"`,
          `class="${matcher[1]} ${transformStyleToUnocss(inlineStyle)}"`,
        ),
      )
    }

    code = code.replace(` style="${inlineStyle}"`, '')

    return code.replace(
      target,
      target.replace(
        `<${tag}`,
        `<${tag} class="${transformStyleToUnocss(inlineStyle)}"`,
      ),
    )
  }

  return code.replace(
    target,
    target.replace(
      `style="${inlineStyle}"`,
      transformStyleToUnocss(inlineStyle),
    ),
  )
}
