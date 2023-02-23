import { getVal, joinWithUnderLine } from './utils'

export function border(key: string, val: string) {
  if (key === 'border-spacing')
    return `${key}-[${joinWithUnderLine(val)}]`
  if (key === 'border-color')
    return `border-${getVal(val)}`

  if (key === 'border-radius')
    return `border-rd-${getVal(val)}`
  return `border-${val}`
}
