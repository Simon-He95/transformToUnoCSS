import { lessCompiler } from './lessCompiler'
import { sassCompiler } from './sassCompiler'
import { stylusCompiler } from './stylusCompiler'
import type { CssType } from './utils'

export function compilerCss(css: string, lang: CssType, filepath?: string) {
  switch (lang) {
    case 'styl':
      return stylusCompiler(css, filepath)
    case 'less':
      return lessCompiler(css, filepath)
    case 'scss':
      return sassCompiler(css, filepath)
    default:
      return css
  }
}
