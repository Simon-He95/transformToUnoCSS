import { getLastName, getVal, transformImportant } from './utils'

export function word(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key.startsWith('word-spacing'))
    return `word-spacing${getVal(val)}`
  if (value === 'keep-all')
    return `break-keep${important}`
  return `break-${getLastName(value)}${important}`
}
