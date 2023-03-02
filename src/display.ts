import { transformImportant } from './utils'

export function display(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (value === 'none')
    return `hidden${important}`
  if (value === 'hidden')
    return `invisible${important}`
  return `${value}${important}`
}
