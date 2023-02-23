export function scroll(key: string, val: string) {
  if (key.startsWith('scroll-snap'))
    return `snap-${val}`
  if (key === 'scroll-behavior')
    return `scroll-${val}`
  // margin padding
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, prefix, suffix] = key.match(/scroll-(margin|padding)-?([\w]+)?/)!
  if (suffix)
    return `scroll-${prefix[0]}${suffix[0]}-${val}`
  return `scroll-${prefix[0]}-${val}`
}
