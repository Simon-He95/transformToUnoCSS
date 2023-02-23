const keepTransition = ['transition', 'transition-property']
const times = ['transition-delay', 'transition-duration']
export function transformTransition(key: string, val: string) {
  if (keepTransition.includes(key)) {
    if (val.includes('color'))
      return 'transition-colors'
    if (val === 'box-shadow')
      return 'transition-shadow'
    return `transition-${val}`
  }
  if (times.includes(key))
    return `${key.split('-')[1]}-${val.slice(0, -2)}`

  console.log({ key, val })
}
