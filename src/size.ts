import { trim } from 'lazy-js-utils'
import { getFirstName, isCalc } from './utils'
export function transformSize(key: string, val: string) {
  if (isCalc(val))
    return `${key[0]}-[${trim(val, 'all')}]`
  return `${key[0]}-${getFirstName(val)}`
}

