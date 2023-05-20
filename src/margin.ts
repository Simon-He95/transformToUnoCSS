import { getVal, transformImportant, trim } from './utils'
const map: any = {
  'margin-left': 'ml',
  'margin-right': 'mr',
  'margin-top': 'mt',
  'margin-bottom': 'mb',
  'margin-inline-start': 'ms',
  'margin-inline-end': 'me',
  'padding-left': 'pl',
  'padding-right': 'pr',
  'padding-top': 'pt',
  'padding-bottom': 'pb',
  'padding-inline-start': 'ps',
  'padding-inline-end': 'pe',
}
export function transformMargin(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const specail = map[key]

  if (specail)
    return `${specail}${getVal(value)}${important}`
  const values = trim(value).split(' ')
  const len = values.length

  if (len === 1)
    return `${key[0]}${getVal(values[0])}${important}`
  if (len === 2) {
    return `${key[0]}x${getVal(values[1])}${important} ${key[0]}y${getVal(
      values[0],
    )}${important}`
  }
  if (len === 3) {
    return `${key[0]}x${getVal(values[1])}${important} ${key[0]}t${getVal(
      values[0],
    )}${important} ${key[0]}b${getVal(values[2])}${important}`
  }
  return `${key[0]}t${getVal(values[0])}${important} ${key[0]}b${getVal(
    values[2],
  )}${important} ${key[0]}l${getVal(values[3])}${important} ${key[0]}r${getVal(
    values[1],
  )}${important}`
}
