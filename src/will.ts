import { getFirstName, transformImportant } from './utils'

export function will(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${key}-${getFirstName(value)}${important}`
}
