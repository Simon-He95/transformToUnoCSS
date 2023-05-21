import { transformImportant } from './utils'

export function content(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `content="[${value}]${important}"`
}
