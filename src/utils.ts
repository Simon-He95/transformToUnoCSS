import { trim } from 'lazy-js-utils'
export function isCalc(s: string) {
  return s.startsWith('calc(')
}

export function getFirstName(s: string) {
  return s.split('-')[0]
}

export function isUrl(s: string) {
  return s.startsWith('url(')
}

export function isPercent(s: string) {
  return s.endsWith('%')
}

export function isHex(hex: string) {
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function getVal(val: string, transform?: Function) {
  if (isCalc(val) || isUrl(val) || isRgb(val))
    return `[${trim(val, 'all')}]`
  return transform ? transform(val) : val
}
