import { getFirstName } from './utils'

export function transformList(key: string, val: string) {
  return `${getFirstName(key)}-${val}`
}
