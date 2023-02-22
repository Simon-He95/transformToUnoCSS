import { isUrl } from './utils'

const background = ['background', 'background-size', 'background-attachments', 'background-position', 'background-image']

export function transformBackground(key: string, val: string) {
  if (background.includes(key)) {
    if (isUrl(val))
      return `bg-[${val}]`

    return `bg-${transformSpaceToLine(val)}`
  }

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
