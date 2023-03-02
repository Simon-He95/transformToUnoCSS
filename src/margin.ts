import { transformImportant, trim } from './utils'
const map: any = {
  'margin-left': 'ml',
  'margin-right': 'mr',
  'margin-top': 'mt',
  'margin-bottom': 'mb',
  'padding-left': 'pl',
  'padding-right': 'pr',
  'padding-top': 'pt',
  'padding-bottom': 'pb',
}
export function transformMargin(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const specail = map[key]
  if (specail)
    return `${specail}-${value}${important}`
  const values = trim(value).split(' ')
  const len = values.length
  if (len === 1)
    return `${key[0]}-${values[0]}${important}`
  if (len === 2)
    return `${key[0]}x-${values[1]}${important} ${key[0]}y-${values[0]}${important}`
  if (len === 3)
    return `${key[0]}x-${values[1]}${important} ${key[0]}t-${values[0]}${important} ${key[0]}b-${values[2]}${important}`
  return `${key[0]}t-${values[0]}${important} ${key[0]}b-${values[2]}${important} ${key[0]}l-${values[3]}${important} ${key[0]}r-${values[1]}${important}`
}
