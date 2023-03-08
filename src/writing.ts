export function writing(key: string, val: string) {
  return `write-${val.replace('-rl', '-right').replace('-lr', '-left')}`
}
