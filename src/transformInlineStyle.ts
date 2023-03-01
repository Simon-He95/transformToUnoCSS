import { transformStyleToUnocss } from '.'

const styleReg = /(:)?style="(.*)"/
const transformFn = (source: string) => source

export function tansformInlineStyle(
  code: string,
): [string, (source: string) => string] {
  const match = code.match(styleReg)

  if (!match)
    return [code, transformFn]
  const [target, comma, inlineStyle] = match

  if (comma)
    return [code, transformFn]

  // transform inline-style
  return [
    code.replace(target, transformStyleToUnocss(inlineStyle)),
    (source: string) =>
      source.replace(target, transformStyleToUnocss(inlineStyle)),
  ]
}
