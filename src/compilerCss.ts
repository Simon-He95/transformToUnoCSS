import { lessCompiler } from './lessCompiler'
import { sassCompiler } from './sassCompiler'
import { stylusCompiler } from './stylusCompiler'
import type { CssType } from './utils'

export function compilerCss(css: string, lang: CssType) {
  switch (lang) {
    case 'stylus':
      return stylusCompiler(css)
    case 'less':
      return lessCompiler(css)
    case 'scss':
      return sassCompiler(css)
    default:
      return css
  }
}
