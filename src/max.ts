import { getFirstName } from './utils'

export function transformMax(key: string, val: string) {
  const all = key.split('-')
  return `${all[0]}-${all[1][0]}-${getFirstName(val)}`
}
