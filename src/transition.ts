import { transformImportant, trim } from './utils'
const keepTransition = ['transition', 'transition-property']
const times = ['transition-delay', 'transition-duration']

export function transition(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'transition-timing-function') {
    if (value === 'linear')
      return `ease-${value}${important}`
    return `ease="[${trim(value, 'all')}]${important}"`
  }
  if (keepTransition.includes(key)) {
    if (value.includes('color'))
      return `transition-colors${important}`
    if (value === 'box-shadow')
      return `transition-shadow${important}`
    return `transition-${value}${important}`
  }
  if (times.includes(key))
    return `${key.split('-')[1]}-${value.slice(0, -2)}`
}
