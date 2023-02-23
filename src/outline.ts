import { getFirstName } from './utils'

export function outline(key: string, val: string) {
  if (key === 'outline-offset')
    return `${key}-${val}`
  return `${getFirstName(key)}-${val}`
}
