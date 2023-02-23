import { getLastName } from './utils'

export function align(key: string, val: string) {
  return `${getLastName(key)}-${getLastName(val)}`
}
