import { transformImportant } from './utils'

export function scroll(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key.startsWith('scroll-snap'))
    return `snap-${value}${important}`
  if (key === 'scroll-behavior')
    return `scroll-${value}${important}`
  // margin padding
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, prefix, suffix, way] = key.match(
    /scroll-(margin|padding)-?([\w]+)?-?([\w]+)?/,
  )!
  if (suffix === 'inline' && way)
    return `scroll-${prefix[0]}${way[0]}-${value}${important}`
  if (suffix)
    return `scroll-${prefix[0]}${suffix[0]}-${value}${important}`
  return `scroll-${prefix[0]}-${value}${important}`
}
