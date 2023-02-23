import { filter } from './filter'

export function backdrop(key: string, val: string) {
  return `backdrop-${filter(key, val)}`
}
