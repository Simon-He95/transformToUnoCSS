import { getFirstName, getLastName } from './utils'

const lastMaps = ['flex-basis', 'flex-grow', 'flex-shrink']
export function transformFlex(key: string, val: string) {
  if (lastMaps.includes(key))
    return `${getLastName(key)}-${val}`

  return `${getFirstName(key)}-${val}`
}
