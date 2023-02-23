import { getLastName } from './utils'

export function justify(key: string, val: string) {
  if (key === 'justify-content')
    return `justify-${getLastName(val)}`
  return `${key}-${getLastName(val)}`
}
