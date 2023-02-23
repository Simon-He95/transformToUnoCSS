export function display(key: string, val: string) {
  if (val === 'none')
    return 'hidden'
  if (val === 'hidden')
    return 'invisible'
  return val
}
