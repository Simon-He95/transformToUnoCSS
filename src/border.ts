import { getVal, joinWithUnderLine, transformImportant } from './utils'

const borderSize = [
  'border-left',
  'border-top',
  'border-right',
  'border-bottom',
]
export function border(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${key}="[${joinWithUnderLine(value)}]${important}"`
  if (key === 'border-color')
    return `border${getVal(value)}${important}`

  if (key === 'border-radius')
    return `border-rd${getVal(value)}${important}`

  if (borderSize.some(b => key.startsWith(b)))
    return `border-${key.split('-')[1][0]}${getVal(value)}`
  if (key.startsWith('border-image'))
    return ''

  return `border-${value}${important}`
}
