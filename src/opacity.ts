import { isPercent } from './utils'

export function transformOpacity(key: string, val: string) {
  if (isPercent(val))
    return `op-${val.replace('%', '')}`

  return `op-${+val * 100}`
}
