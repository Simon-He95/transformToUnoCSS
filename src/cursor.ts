import { getVal } from './utils'

export function cursor(key: string, val: string) {
  return `${key}${getVal(val)}`
}
