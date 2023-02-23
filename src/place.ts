import { getLastName } from './utils'

export function place(key: string, val: string) {
  return `${key}-${getLastName(val)}`
}
