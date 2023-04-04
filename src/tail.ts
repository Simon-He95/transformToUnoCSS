export function tail(css: string) {
  if (/not\(/.test(css))
    return `[&:${css}]:`
  if (css.startsWith('nth')) {
    if (css === 'nth-child(odd)')
      return 'odd'
    if (css === 'nth-child(even)')
      return 'even'
    return ''
  }
  if (css.startsWith('aria-') || css.startsWith('data-'))
    return css.split('=')[0]
  if (css.startsWith('dir='))
    return css.split('=')[1]
  if (css === 'file-selector-button')
    return 'file'
  if (css.endsWith('-child'))
    return css.split('-')[0]
  return css
}
