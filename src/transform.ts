import { trim } from 'lazy-js-utils'
import { getHundred } from './utils'

export function transform(key: string, val: string) {
  if (key === 'transform-origin')
    return `origin-${val.replace(/\s+/, ' ').split(' ').join('-')}`
  const [_, namePrefix, nameSuffix, value] = val.match(/([a-z]+)([A-Z])?\((.*)\)/)!

  if (nameSuffix) {
    if (namePrefix === 'scale')
      return `${namePrefix}-${nameSuffix.toLowerCase()}-${getHundred(value)}`
    return `${namePrefix}-${nameSuffix.toLowerCase()}-${transformVal(value)}`
  }
  else {
    if (namePrefix === 'scale')
      return `${namePrefix}-${getHundred(value)}`
    return `${namePrefix}-${transformVal(value)}`
  }
}

function transformVal(val: string) {
  val = trim(val, 'all')
  if (val.endsWith('deg'))
    return val.slice(0, -3)
  return val
}
