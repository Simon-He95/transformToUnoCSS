import { getVal, transformImportant } from './utils'

export function line(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `lh${getVal(value)}${important}`
}
