import { getLastName, transformImportant } from './utils'

export function align(key: string, val: string) {
  const [value, important] = transformImportant(val)
  return `${getLastName(key)}-${getLastName(value)}${important}`
}
