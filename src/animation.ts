import { getVal, transformImportant } from './utils'

export function animation(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'animation-delay')
    return `animate${getVal(value)}${important}`
  if (key === 'animation')
    return `animate-${value.split(' ')[0]}${important}`
  return `animate-${value}${important}`
}
