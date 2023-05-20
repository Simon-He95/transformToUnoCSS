import { getVal, transformImportant } from './utils'

export function inset(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'inset-inline-start')
    return `start${getVal(value)}${important}`
  if (key === 'inset-inline-end')
    return `end${getVal(value)}${important}`
  return undefined
}
