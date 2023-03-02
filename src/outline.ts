import { getFirstName, transformImportant } from './utils'

export function outline(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'outline-offset')
    return `${key}-${value}${important}`
  return `${getFirstName(key)}-${value}${important}`
}
