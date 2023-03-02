import { transformImportant } from './utils'

export function row(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `gap-y-${value}${important}`
}
