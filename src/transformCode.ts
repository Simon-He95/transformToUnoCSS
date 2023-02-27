import { transformStyleToUnocss } from '.'

const styleReg = /(:)?style="(.*)"/
export function transfromCode(code: string) {
  const match = code.match(styleReg)
  if (!match)
    return code
  const [target, comma, style] = match
  if (comma)
    return code

  const result = code.replace(target, transformStyleToUnocss(style))
  return result
}
