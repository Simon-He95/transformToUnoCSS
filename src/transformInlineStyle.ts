import { transformStyleToUnocss } from '.'

const styleReg = /(:)?style="([\w\:\-\s;\[\]\/\+%]+)"/

export function tansformInlineStyle(code: string): string {
  const match = code.match(styleReg)

  if (!match)
    return code
  const [target, comma, inlineStyle] = match

  if (comma)
    return code

  // transform inline-style
  return code.replace(target, transformStyleToUnocss(inlineStyle))
}
