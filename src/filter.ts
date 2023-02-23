import { transformBox } from './box'
import { getHundred } from './utils'

const hundred = ['contrast', 'brightness', 'saturate']
const percent = ['grayscale', 'invert', 'sepia']
export function transformFilter(key: string, val: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, name, value] = val.match(/([\w-]+)\((.*)\)/)!

  if (hundred.includes(name))
    return `${name}-${getHundred(value)}`

  if (name === 'drop-shadow')
    return `drop-${transformBox(name, value)}`
  if (percent.includes(name))
    return `${name}-${value.endsWith('%') ? value.slice(0, -1) : getHundred(value)}`
  if (name === 'hue-rotate')
    return `${name}-${value.slice(0, -3)}`
  return `${name}-${value}`
}
