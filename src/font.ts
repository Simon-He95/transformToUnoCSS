import { transformImportant } from './utils'

export function font(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'font-size')
    return `text-${value}${important}`
  if (key === 'font-weight')
    return `font-${value}${important}`
  if (key === 'font-family') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, family] = value.match(/ui-(\w{0,4})/)!

    return `font-${family}${important}`
  }
  if (key === 'font-style') {
    if (value === 'normal')
      return `font-not-italic${important}`
    return `font-${value}${important}`
  }
  if (key === 'font-variant-numeric') {
    if (value === 'normal')
      return `normal-nums${important}`
    return `${value}${important}`
  }
}
