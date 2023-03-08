import { getFirstName, getVal, transformImportant } from './utils'

export function list(key: string, val: string) {
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
