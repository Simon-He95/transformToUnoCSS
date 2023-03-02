import { transformImportant } from './utils'

export function isolation(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (val === 'isolate')
    return `${value}${important}`
  return `${key}-${value}${important}`
}
