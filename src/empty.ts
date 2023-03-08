const emptyMap: Record<string, string> = {
  show: 'visible',
  hide: 'hidden',
}
export function empty(key: string, val: string) {
  return `table-empty-cells-${emptyMap[val] ?? val}`
}
