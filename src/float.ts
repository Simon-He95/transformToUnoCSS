import { transformImportant } from './utils'

export function float(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${key}-${value}${important}`
}
