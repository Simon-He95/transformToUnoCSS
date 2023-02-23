export function column(key: string, val: string) {
  if (key === 'column-gap')
    return `gap-x-${val}`
  return `${key}-${val}`
}
