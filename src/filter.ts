import { transformBox } from './box'

const hundred = ['contrast', 'brightness', 'saturate']
const percent = ['grayscale', 'invert', 'sepia']
export function transformFilter(key: string, val: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, name, value] = val.match(/([\w-]+)\((.*)\)/)!

  if (hundred.includes(name))
    return `${name}-${+value * 100}`

  if (name === 'drop-shadow')
    return `drop-${transformBox(name, value)}`
  if (percent.includes(name))
    return `${name}-${value.endsWith('%') ? value.slice(0, -1) : +value * 100}`
  if (name === 'hue-rotate')
    return `${name}-${value.slice(0, -3)}`
  return `${name}-${value}`
}
