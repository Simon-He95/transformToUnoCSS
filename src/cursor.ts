import { getVal, transformImportant } from './utils'

export function cursor(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value)}${important}`
}
