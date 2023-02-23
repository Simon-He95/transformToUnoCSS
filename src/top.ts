import { getVal } from './utils'

export function top(key: string, val: string) {
  return `${key}-${getVal(val)}`
}
