import { trim } from 'lazy-js-utils'
export function transformBox(key: string, val: string) {
  const rgb = /rgba?(\([\w,\s.]+\))/g
  val = val.replace(rgb, (r, v) => r.replace(v, trim(v, 'all')))
  return `shadow-[${val.replace(/\s+/, ' ').split(' ').join('_')}]`
}
