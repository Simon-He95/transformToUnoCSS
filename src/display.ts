export function transformDisplay(key: string, val: string) {
  if (val === 'none')
    return 'hidden'
  return val
}
