import { getFirstName, getVal, transformImportant } from './utils'

export function max(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const all = key.split('-')
  return `${all[0]}-${all[1][0]}${getVal(getFirstName(value))}${important}`
}
