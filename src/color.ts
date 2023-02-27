import { getVal } from './utils'

export function color(key: string, val: string) {
  return `text${getVal(val)}`
}
