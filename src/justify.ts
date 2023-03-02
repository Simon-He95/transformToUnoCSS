import { getLastName, transformImportant } from './utils'

export function justify(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'justify-content')
    return `justify-${getLastName(value)}${important}`
  return `${key}-${getLastName(value)}${important}`
}
