export function font(key: string, val: string) {
  if (key === 'font-size')
    return `text-${val}`
  if (key === 'font-weight')
    return `font-${val}`
  if (key === 'font-family') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, family] = val.match(/ui-(\w{0,4})/)!

    return `font-${family}`
  }
  if (key === 'font-style') {
    if (val === 'normal')
      return 'font-not-italic'
    return `font-${val}`
  }
  if (key === 'font-variant-numeric') {
    if (val === 'normal')
      return 'normal-nums'
    return val
  }
}
