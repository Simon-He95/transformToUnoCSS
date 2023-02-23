export function resize(key: string, val: string) {
  const map: any = {
    vertical: 'y',
    horizontal: 'x',
  }
  if (val === 'both')
    return key
  return `${key}-${map[val] || val}`
}
