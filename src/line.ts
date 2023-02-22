import { trim } from 'lazy-js-utils'
import { isCalc } from './utils'

export function transformLine(key: string, val: string) {
  if (isCalc(val))
    return `lh-[${trim(val, 'all')}]`
  return `lh-${val}`
}
