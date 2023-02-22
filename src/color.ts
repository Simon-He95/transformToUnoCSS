import { trim } from 'lazy-js-utils'
import { isRgb } from './utils'

export function transformColor(key: string, val: string) {
  if (isRgb(val))
    return `text-[${trim(val, 'all')}]`
  return `text-${val}`
}
