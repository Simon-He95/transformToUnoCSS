export function tail(css: string) {
  if (css.startsWith('nth')) {
    if (css === 'nth-child(odd)')
      return 'odd'
    if (css === 'nth-child(even)')
      return 'even'
    return ''
  }
  if (css === 'file-selector-button')
    return 'file'
  return css
}
