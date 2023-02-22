import { getVal } from './utils'

export function transformBorder(key: string, val: string) {
  if (key === 'border-color')
    return `border-${getVal(val)}`

  if (key === 'border-radius')
    return `border-rd-${getVal(val)}`
  return `border-${val}`
}
