import { getLastName, transformImportant } from './utils'

export function place(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${key}-${getLastName(value)}${important}`
}
