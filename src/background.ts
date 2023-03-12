import { getVal, isRgb, transformImportant, trim } from './utils'

const backgroundMap = [
  'background-color',
  'background-size',
  'background-attachment',
  'background-position',
  'background-image',
]
const gradientReg
  = /linear-gradient\(\s*to\s+(\w+)\s*(\w+)?\s*,\s*([\w\(\), ]+)\s*,\s*([\w\(\), ]+)\s*\)$/
export function background(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (backgroundMap.includes(key))
    return `bg${getVal(value, transformSpaceToLine)}${important}`

  if (key === 'background') {
    if (value.startsWith('linear-gradient')) {
      const matcher = value.match(gradientReg)
      if (!matcher)
        return
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, from, to, fromColor, toColor] = matcher
      return `bg-gradient-to-${from?.[0] || ''}${to?.[0] || ''} from${
        isRgb(fromColor)
          ? `="[${trim(fromColor, 'all')}]${important}"`
          : `-${fromColor}${important}`
      } to${
        isRgb(toColor)
          ? `="[${trim(toColor, 'all')}]${important}"`
          : `-${toColor}${important}`
      }`
    }
    return `bg="${value}${important}"`
  }

  if (key === 'background-blend-mode')
    return `bg-blend-${value}${important}`

  return `${replaceBackground(key, value)}-${transformBox(value)}${important}`
}

function replaceBackground(s: string, val: string) {
  if (val.endsWith('repeat'))
    return 'bg'
  return s.replace('background', 'bg')
}

function transformBox(s: string) {
  const reg = /(border)|(content)-box/
  if (reg.test(s))
    return s.replace('-box', '')
  if (s.startsWith('repeat-'))
    return s.replace('repeat-', '')
  return transformSpaceToLine(s)
}

function transformSpaceToLine(s: string) {
  return s.replace(/\s+/, ' ').replace(' ', '-')
}
