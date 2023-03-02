import { getFirstName, joinWithLine, transformImportant } from './utils'

export function object(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'object-position')
    return `${getFirstName(key)}-${joinWithLine(value)}${important}`
  return `${getFirstName(key)}-${value}${important}`
}
