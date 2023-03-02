import { box } from './box'
import { getHundred, transformImportant } from './utils'

const hundred = ['contrast', 'brightness', 'saturate']
const percent = ['grayscale', 'invert', 'sepia']
export function filter(key: string, val: string) {
  const [v, important] = transformImportant(val)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, name, value] = v.match(/([\w-]+)\((.*)\)/)!

  if (hundred.includes(name))
    return `${name}-${getHundred(value)}${important}`

  if (name === 'drop-shadow')
    return `drop-${box(name, value)}${important}`
  if (percent.includes(name)) {
    return `${name}-${
      value.endsWith('%') ? value.slice(0, -1) : getHundred(value)
    }${important}`
  }
  if (name === 'hue-rotate')
    return `${name}-${value.slice(0, -3)}${important}`
  return `${name}-${value}${important}`
}
