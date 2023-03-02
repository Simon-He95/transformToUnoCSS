import { getVal, joinWithUnderLine, transformImportant } from './utils'

export function border(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${key}="[${joinWithUnderLine(value)}]${important}"`
  if (key === 'border-color')
    return `border${getVal(value)}${important}`

  if (key === 'border-radius')
    return `border-rd${getVal(value)}${important}`
  return `border-${value}${important}`
}
