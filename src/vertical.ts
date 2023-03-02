import { transformImportant } from './utils'

export function vertical(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `v-${value}${important}`
}
