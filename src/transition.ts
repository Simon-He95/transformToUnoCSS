import { trim } from './utils'
const keepTransition = ['transition', 'transition-property']
const times = ['transition-delay', 'transition-duration']

export function transition(key: string, val: string) {
  if (key === 'transition-timing-function') {
    if (val === 'linear')
      return `ease-${val}`
    return `ease-[${trim(val, 'all')}]`
  }
  if (keepTransition.includes(key)) {
    if (val.includes('color'))
      return 'transition-colors'
    if (val === 'box-shadow')
      return 'transition-shadow'
    return `transition-${val}`
  }
  if (times.includes(key))
    return `${key.split('-')[1]}-${val.slice(0, -2)}`
}
