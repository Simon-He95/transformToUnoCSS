import { getLastName } from './utils'

export function user(key: string, val: string) {
  return `${getLastName(key)}-${val}`
}
