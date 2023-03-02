import { transformImportant } from './utils'

export function column(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'column-gap')
    return `gap-x-${value}${important}`
  return `${key}-${value}${important}`
}
