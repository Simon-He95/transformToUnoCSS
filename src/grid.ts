import { getFirstName, getLastName, joinWithLine, trim } from './utils'

export function grid(key: string, val: string) {
  if (key.startsWith('grid-template')) {
    const matcher = val.match(/repeat\s*\(\s*([0-9]+)/)
    if (matcher) {
      return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${
        matcher[1]
      }`
    }
    return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${val}`
  }
  if (key === 'grid-auto-flow')
    return `grid-flow-${joinWithLine(val).replace('column', 'col')}`
  if (key.startsWith('grid-auto')) {
    const matcher = val.match(/minmax\s*\(\s*0\s*,\s*1fr/)
    return `auto-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${
      matcher ? 'fr' : getFirstName(val)
    }`
  }
  const matcher = val.match(/span\s+([0-9])/)
  if (matcher)
    return `${key.slice(5).replace('column', 'col')}-span-${matcher[1]}`
  if (trim(val, 'all') === '1/-1')
    return `${key.slice(5).replace('column', 'col')}-span-full`
  return `${key.slice(5).replace('column', 'col')}-${val}`
}
