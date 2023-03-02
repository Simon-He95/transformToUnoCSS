import { transformImportant } from './utils'

export function letter(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `tracking-${value}${important}`
}
