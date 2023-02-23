export function overscroll(key: string, val: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefix, _, suffix] = key.split('-')
  if (suffix)
    return `${prefix}-${suffix}-${val}`
  return `${prefix}-${val}`
}
