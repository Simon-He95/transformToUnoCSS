import { getVal } from './utils'

export function line(key: string, val: string) {
  return `lh${getVal(val)}`
}
