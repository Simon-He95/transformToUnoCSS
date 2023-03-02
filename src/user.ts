import { getLastName, transformImportant } from './utils'

export function user(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${getLastName(key)}-${value}${important}`
}
