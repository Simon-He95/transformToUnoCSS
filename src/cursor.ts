import { trim } from 'lazy-js-utils'
import { isUrl } from './utils'

export function transformCursor(key: string, val: string) {
  if (isUrl(val))
    return `${key}-[${trim(val, 'all')}]`

  return `${key}-${val}`
}
