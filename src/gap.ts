export function transformGap(key: string, val: string) {
  if (key.startsWith('column'))
    return `gap-x-${val}`
  return `gap-y-${val}`
}
