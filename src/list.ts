import { getFirstName, transformImportant } from './utils'

export function list(key: string, val: string) {
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}-${value}${important}`
}
