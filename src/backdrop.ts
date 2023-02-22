import { transformFilter } from './filter'

export function transformBackdrop(key: string, val: string) {
  return `backdrop-${transformFilter(key, val)}`
}
