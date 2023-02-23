import { getVal } from './utils'

const backgroundMap = ['background', 'background-color', 'background-size', 'background-attachment', 'background-position', 'background-image']

export function background(key: string, val: string) {
  if (backgroundMap.includes(key))
    return `bg-${getVal(val, transformSpaceToLine)}`
  if (key === 'background-blend-mode')
    return `bg-blend-${val}`

  return `${replaceBackground(key, val)}-${transformBox(val)}`
}

function replaceBackground(s: string, val: string) {
  if (val.endsWith('repeat'))
    return 'bg'
  return s.replace('background', 'bg')
}

function transformBox(s: string) {
  const reg = /(border)|(content)-box/
  if (reg.test(s))
    return s.replace('-box', '')
  if (s.startsWith('repeat-'))
    return s.replace('repeat-', '')
  return transformSpaceToLine(s)
}

function transformSpaceToLine(s: string) {
  return s.replace(/\s+/, ' ').replace(' ', '-')
}
