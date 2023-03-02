import { transformImportant } from './utils'

export function transformGap(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key.startsWith('column'))
    return `gap-x-${value}${important}`
  return `gap-y-${value}${important}`
}
