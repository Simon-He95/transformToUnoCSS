import { getVal, isRgb, transformImportant, trim } from './utils'

const backgroundMap = [
  'background-color',
  'background-size',
  'background-attachment',
  'background-position',
  'background-image',
]
const linearGradientReg
  = /linear-gradient\(\s*to([\w\s]+),?([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/

const otherGradientReg
  = /(radial|conic)-gradient\(([\w\(\)#%\s\.]+)?,([\w\(\)#%\s\.]+)?,?([\w#%\s\.]+)?\)$/
export function background(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (backgroundMap.includes(key))
    return `bg${getVal(value, transformSpaceToLine)}${important}`

  if (key === 'background') {
    if (/(linear)-gradient/.test(value)) {
      const commaReplacer = '__comma__'
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([\w\s,]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)),
      )

      const matcher = newValue.match(linearGradientReg)
      if (!matcher)
        return

      let [direction, from, via, to] = matcher.slice(1)
      if (via && !to) {
        to = via
        via = ''
      }
      direction = trim(direction, 'around')
        .split(' ')
        .map(item => item[0])
        .join('')

      let result = ''
      if (from) {
        from = from.replaceAll(commaReplacer, ',')
        const [fromColor, fromPosition] = trim(from, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (fromPosition) {
          result += ` from="${
            isRgb(fromColor) ? `[${fromColor}]` : fromColor
          } ${fromPosition}"`
        }
        else if (fromColor) {
          result += ` from="${isRgb(fromColor) ? `[${fromColor}]` : fromColor}"`
        }
      }

      if (via) {
        via = via.replaceAll(commaReplacer, ',')
        const [viaColor, viaPosition] = trim(via, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (viaPosition) {
          result += ` via="${
            isRgb(viaColor) ? `[${viaColor}]` : viaColor
          } ${viaPosition}"`
        }
        else if (viaColor) {
          result += ` via="${isRgb(viaColor) ? `[${viaColor}]` : viaColor}"`
        }
      }

      if (to) {
        to = to.replaceAll(commaReplacer, ',')
        const [toColor, toPosition] = trim(to, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (toPosition) {
          result += ` to="${
            isRgb(toColor) ? `[${toColor}]` : toColor
          } ${toPosition}"`
        }
        else if (toColor) {
          result += ` to="${isRgb(toColor) ? `[${toColor}]` : toColor}"`
        }
      }
      if (direction)
        result = `bg-gradient-to-${direction}${result}`

      return result
    }
    else if (/(radial|conic)-gradient/.test(value)) {
      const commaReplacer = '__comma__'
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([\w\s,]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)),
      )

      const matcher = newValue.match(otherGradientReg)
      if (!matcher)
        return

      // eslint-ignore @typescript-eslint/no-non-null-assertion
      const name = matcher[1]
      let [from, via, to] = matcher.slice(2)
      if (via && !to) {
        to = via
        via = ''
      }

      let result = ''
      if (from) {
        from = from.replaceAll(commaReplacer, ',')
        const [fromColor, fromPosition] = trim(from, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (fromPosition) {
          result += ` from="${
            isRgb(fromColor) ? `[${fromColor}]` : fromColor
          } ${fromPosition}"`
        }
        else if (fromColor) {
          result += ` from="${isRgb(fromColor) ? `[${fromColor}]` : fromColor}"`
        }
      }

      if (via) {
        via = via.replaceAll(commaReplacer, ',')
        const [viaColor, viaPosition] = trim(via, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (viaPosition) {
          result += ` via="${
            isRgb(viaColor) ? `[${viaColor}]` : viaColor
          } ${viaPosition}"`
        }
        else if (viaColor) {
          result += ` via="${isRgb(viaColor) ? `[${viaColor}]` : viaColor}"`
        }
      }

      if (to) {
        to = to.replaceAll(commaReplacer, ',')
        const [toColor, toPosition] = trim(to, 'around')
          .replace(/rgba?\(([\w,\s]+)\)/, (all, v) =>
            all.replace(v, trim(v, 'all')),
          )
          .split(' ')
        if (toPosition) {
          result += ` to="${
            isRgb(toColor) ? `[${toColor}]` : toColor
          } ${toPosition}"`
        }
        else if (toColor) {
          result += ` to="${isRgb(toColor) ? `[${toColor}]` : toColor}"`
        }
      }
      result = `bg-gradient-${name}${result}`

      return result
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
