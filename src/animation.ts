import { getVal } from './utils'

export function animation(key: string, val: string) {
  if (key === 'animation-delay')
    return `animate${getVal(val)}`
  if (key === 'animation')
    return `animate-${val.split(' ')[0]}`
  return `animate-${val}`
}
