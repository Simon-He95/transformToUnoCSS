import { getVal } from './utils'

export function transformColor(key: string, val: string) {
  return `text-${getVal(val)}`
}
