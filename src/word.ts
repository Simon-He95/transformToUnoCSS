import { getLastName, transformImportant } from './utils'

export function word(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (value === 'keep-all')
    return `break-keep${important}`
  return `break-${getLastName(value)}${important}`
}
