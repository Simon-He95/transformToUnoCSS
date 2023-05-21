import { transformImportant } from './utils'

const emptyMap: Record<string, string> = {
  show: 'visible',
  hide: 'hidden',
}
export function empty(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `table-empty-cells-${emptyMap[value] ?? value}${important}`
}
