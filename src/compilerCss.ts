import { lessCompiler } from './lessCompiler'
import { sassCompiler } from './sassCompiler'
import { stylusCompiler } from './stylusCompiler'
import type { CssType } from './utils'

export function compilerCss(
  css: string,
  lang: CssType,
  filepath?: string,
  globalCss?: any,
) {
  switch (lang) {
    case 'styl':
      return stylusCompiler(css, filepath, globalCss?.styl?.additionalData)
    case 'less':
      return lessCompiler(css, filepath, globalCss?.less?.additionalData)
    case 'scss':
      return sassCompiler(css, filepath, globalCss?.scss?.additionalData)
    default:
      return css
  }
}
