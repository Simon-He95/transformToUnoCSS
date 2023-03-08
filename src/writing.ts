export function writing(key: string, val: string) {
  if (val === 'horizontal-tb')
    return 'write-normal'
  return `write-${val.replace('-rl', '-right').replace('-lr', '-left')}`
}
