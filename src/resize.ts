import { transformImportant } from './utils'

const map: any = {
  vertical: 'y',
  horizontal: 'x',
}
export function resize(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (value === 'both')
    return `${key}${important}`
  return `${key}-${map[value] || value}${important}`
}
