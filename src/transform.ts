import {
  getHundred,
  joinEmpty,
  joinWithLine,
  transformImportant,
  trim,
} from './utils'

export function transform(key: string, val: string) {
  const [v, important] = transformImportant(val)
  if (key === 'transform-origin')
    return `origin-${joinWithLine(v)}${important}`
  if (key === 'transform-style')
    return `transform-${v}`

  return joinEmpty(v)
    .split(' ')
    .map((v) => {
      const matcher = v.match(/([a-z]+)([A-Z])?\((.*)\)/)

      if (!matcher)
        return undefined
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, namePrefix, nameSuffix, value] = matcher
      if (nameSuffix) {
        if (namePrefix === 'scale') {
          if (value.includes(',')) {
            return `${namePrefix}-${nameSuffix.toLowerCase()}="${value
              .split(',')
              .join(' ')}${important}"`
          }
          return `${namePrefix}-${nameSuffix.toLowerCase()}-${getHundred(
            value,
          )}${important}`
        }
        return `${namePrefix}-${nameSuffix.toLowerCase()}="${transformVal(
          value,
        )}${important}"`
      }
      else {
        if (namePrefix === 'scale') {
          if (value.includes(','))
            return `${namePrefix}="${value.split(',').join(' ')}${important}"`
          return `${namePrefix}-${getHundred(value)}${important}`
        }

        return `${namePrefix}="${transformVal(value).replace(
          /,/g,
          ' ',
        )}${important}"`
      }
    })
    .filter(Boolean)
    .join(' ')
}

function transformVal(val: string) {
  val = trim(val, 'all')
  if (val.endsWith('deg'))
    return val.slice(0, -3)
  return val
}
