import { getFirstName, joinWithLine } from './utils'

export function object(key: string, val: string) {
  if (key === 'object-position')
    return `${getFirstName(key)}-${joinWithLine(val)}`
  return `${getFirstName(key)}-${val}`
}
