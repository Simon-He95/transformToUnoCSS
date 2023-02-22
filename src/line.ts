import { getVal } from './utils'

export function transformLine(key: string, val: string) {
  return `lh-${getVal(val)}`
}
