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
    return isCalc(value) || !value.includes(' ')
      ? `border-rd${getVal(value)}${important}`
      : `border-rd="[${joinWithUnderLine(value)}]${important}"`
  }

  if (borderSize.some(b => key.startsWith(b)))
    return `border-${key.split('-')[1][0]}${getVal(value)}${important}`
  if (key === 'border-inline-end-width')
    return `border-e${getVal(value)}${important}`
  if (key === 'border-inline-start-width')
    return `border-s${getVal(value)}${important}`
  if (key.startsWith('border-image'))
    return ''

  if (/^\d[%|(px)|(rem)]$/.test(value) || key === 'border-collapse')
    return `border-${value}${important}`
  if (key === 'border-width' || key === 'border-style')
    return `border${getVal(value)}${important}`
  if (key === 'border-color') {
    if (value === 'currentColor')
      return `border-current${important}`
    return `border${getVal(value)}${important}`
  }
  if (/rgb/.test(value)) {
    value = value.replace(/rgb[a](.*)/, (all, v) =>
      all.replace(v, trim(v, 'all')),
    )
  }

  return `border="[${joinWithUnderLine(value)}]${important}"`
}
