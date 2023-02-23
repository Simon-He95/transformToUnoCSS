export function isolation(key: string, val: string) {
  if (val === 'isolate')
    return val
  return `${key}-${val}`
}
