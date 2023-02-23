export function text(key: string, val: string) {
  if (key === 'text-decoration-line') {
    if (val === 'none')
      return 'no-underline'
    return val
  }
  if (key === 'text-transform') {
    if (val === 'none')
      return 'normal-case'
    return val
  }
  if (key.startsWith('text-decoration') || key === 'text-indent')
    return `${key.split('-')[1]}-${val}`

  if (key === 'text-underline-offset')
    return `underline-offset-${val}`
  return `text-${val}`
}
