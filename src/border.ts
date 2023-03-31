import {
  getVal,
  isCalc,
  joinWithUnderLine,
  transformImportant,
  trim,
} from './utils'

const borderSize = [
  'border-left',
  'border-top',
  'border-right',
  'border-bottom',
]
export function border(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${key}="[${joinWithUnderLine(value)}]${important}"`
  if (key === 'border-color')
    return `border${getVal(value)}${important}`

  if (key === 'border-radius') {
    return isCalc(value)
      ? `border-rd${getVal(value)}${important}`
      : `border-rd="[${joinWithUnderLine(value)}]${important}"`
  }

  if (borderSize.some(b => key.startsWith(b)))
    return `border-${key.split('-')[1][0]}${getVal(value)}`
  if (key.startsWith('border-image'))
    return ''
  if (/rgb/.test(value)) {
    value = value.replace(/rgb[a](.*)/, (all, v) =>
      all.replace(v, trim(v, 'all')),
    )
  }

  return `border="[${joinWithUnderLine(value)}]${important}"`
}
