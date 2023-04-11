import { getFirstName, transformImportant, trim } from './utils'
export function box(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

  if (key.startsWith('box-decoration'))
    return `box-decoration-${value}${important}`
  if (key === 'box-sizing')
    return `box-${getFirstName(value)}${important}`
  const rgb = /rgba?(\([\w,\s.]+\))/g
  value = value
    .replace(rgb, (r, v) => r.replace(v, trim(v, 'all')))
    .replace(/\s*,\s*/g, ',')
  return `shadow="[${value
    .replace(/\s+/, ' ')
    .split(' ')
    .join('_')}]${important}"`
}
