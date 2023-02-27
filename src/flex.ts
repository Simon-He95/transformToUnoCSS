import { getFirstName, getLastName, joinWithUnderLine, trim } from './utils'

const lastMaps = ['flex-basis', 'flex-grow', 'flex-shrink']
export function flex(key: string, val: string) {
  if (lastMaps.includes(key))
    return `${getLastName(key)}-${val}`
  const firstVal = trim(val)[0]
  if (key === 'flex' && (firstVal === '0' || firstVal === '1'))
    return `flex=[${joinWithUnderLine(val)}]`

  return `${getFirstName(key)}-${val}`
}
