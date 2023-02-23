import { getLastName } from './utils'

export function transformAlign(key: string, val: string) {
  return `${getLastName(key)}-${getLastName(val)}`
}
