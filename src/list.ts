import { getFirstName } from './utils'

export function list(key: string, val: string) {
  return `${getFirstName(key)}-${val}`
}
