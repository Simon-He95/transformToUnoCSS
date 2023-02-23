import { getFirstName } from './utils'

export function will(key: string, val: string) {
  return `${key}-${getFirstName(val)}`
}
