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
