import { getLastName } from './utils'

export function word(key: string, val: string) {
  if (val === 'keep-all')
    return 'break-keep'
  return `break-${getLastName(val)}`
}
