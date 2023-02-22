import { getVal } from './utils'

export function transformTop(key: string, val: string) {
  return `${key}-${getVal(val)}`
}
