import { trim } from 'lazy-js-utils'
import { getFirstName } from './utils'
export function box(key: string, val: string) {
  if (key.startsWith('box-decoration'))
    return `box-decoration-${val}`
  if (key === 'box-sizing')
    return `box-${getFirstName(val)}`
  const rgb = /rgba?(\([\w,\s.]+\))/g
  val = val.replace(rgb, (r, v) => r.replace(v, trim(v, 'all')))
  return `shadow-[${val.replace(/\s+/, ' ').split(' ').join('_')}]`
}
