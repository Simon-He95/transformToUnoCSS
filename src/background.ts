import { getVal, isRgb, transformImportant, trim } from './utils'

const backgroundMap = [
  'background-color',
  'background-size',
  'background-attachment',
  'background-position',
  'background-image',
]
const gradientReg
  = /linear-gradient\(\s*to\s+(\w+)\s*(\w+)?\s*,\s*([\w\(\),#% ]+)\s*,\s*([\w\(\),#% ]+)\s*\)$/
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
      return `bg-gradient-to-${from?.[0] || ''}${
        to?.[0] || ''
      } from="${`${transformColor(
        trim(fromColor, 'around'),
      )}${important}`}" to="${`${transformColor(
        trim(toColor, 'around'),
      )}${important}`}"`
    }
    const match = value.match(/rgba?\([\w,\s]+\)/)
    if (match) {
      const rgb = match[0]
      return `bg="${value.replace(rgb, `[${trim(rgb, 'all')}]`)}${important}"`
    }
    const urlMatch = value.match(/url\(["'\s\.\-_\w\/]*\)/)

    if (urlMatch) {
      return `bg="${value.replace(
        urlMatch[0],
        `[${urlMatch[0].replace(/['"]/g, '')}]${important}`,
      )}"`
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
  const reg = /(border)|(content)|(padding)-box/
  if (reg.test(s))
    return s.replace('-box', '')
  if (s.startsWith('repeat-'))
    return s.replace('repeat-', '')
  return transformSpaceToLine(s)
}

function transformSpaceToLine(s: string) {
  return s.replace(/\s+/, ' ').replace(' ', '-')
}

function transformColor(val: string) {
  if (val.startsWith('rgb')) {
    val = val.replace(/rgba?\(([\w\s,\.]+)\)/, (all, v) =>
      all.replace(v, trim(v, 'all')),
    )
  }

  return val
    .split(' ')
    .map(item => (isRgb(item) ? `[${item}]` : item))
    .join(' ')
}
