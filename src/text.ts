import { transformImportant } from './utils'

export function text(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'text-decoration-line') {
    if (value === 'none')
      return `no-underline${important}`
    return `${value}${important}`
  }
  if (key === 'text-transform') {
    if (value === 'none')
      return `normal-case${important}`
    return `${value}${important}`
  }
  if (key.startsWith('text-decoration') || key === 'text-indent')
    return `${key.split('-')[1]}-${value}${important}`

  if (key === 'text-underline-offset')
    return `underline-offset-${value}${important}`
  return `text-${value}${important}`
}
