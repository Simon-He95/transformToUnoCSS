export function tail(css: string) {
  if (/not\(/.test(css))
    return `[&:${css}]:`
  if (css.startsWith('nth')) {
    if (css === 'nth-child(odd)')
      return 'odd'
    if (css === 'nth-child(even)')
      return 'even'
    // nth-child(2n+1) => 2n+1
    if (css.startsWith('nth-child(')) {
      const match = css.match(/nth-child\((.*)\)/)
      if (match && match[1])
        return `nth-[${match[1]}]`
      return ''
    }
    if (css.startsWith('nth-last-child(')) {
      const match = css.match(/nth-last-child\((.*)\)/)
      if (match && match[1])
        return `nth-last-[${match[1]}]`
      return ''
    }
    if (!css.includes('('))
      return css

    return css.split('(')[0]
  }
  if (css.startsWith('aria-') || css.startsWith('data-'))
    return css.split('=')[0]
  if (css.startsWith('dir='))
    return css.split('=')[1]
  if (css === 'file-selector-button')
    return 'file'
  if (css.endsWith('-child'))
    return css.split('-')[0]
  if (css.startsWith('has(')) {
    const match = css.match(/has\((.*)\)/)
    if (match && match[1])
      return `has-[${match[1]}]`
    return ''
  }
  if (css.startsWith('where(')) {
    const match = css.match(/where\((.*)\)/)
    if (match && match[1])
      return `in-[${match[1]}]`
    return ''
  }
  if (['first-child', 'last-child', 'only-child'].includes(css)) {
    return css.split('-')[0]
  }
  return css
}
