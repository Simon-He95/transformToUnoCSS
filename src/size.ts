import { getFirstName, getVal } from './utils'
export function size(key: string, val: string) {
  return `${key[0]}-${getVal(val, getFirstName)}`
}

