import { transformImportant } from './utils'

export function white(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `whitespace-${value}${important}`
}
