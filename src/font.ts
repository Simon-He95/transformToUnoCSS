export function transformFont(key: string, val: string) {
  if (key === 'font-size')
    return `text-${val}`
  if (key === 'font-weight')
    return `font-${val}`
  if (key === 'font-family') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, family] = val.match(/ui-(\w{0,4})/)!

    return `font-${family}`
  }
  if (key === 'font-style')
    return `font-${val}`
}
