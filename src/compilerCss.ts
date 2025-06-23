import type { CssType } from './utils'
import { lessCompiler } from './lessCompiler'
import { sassCompiler } from './sassCompiler'
import { stylusCompiler } from './stylusCompiler'

/**
 * Compiles CSS from different preprocessors (Sass, Less, Stylus) to standard CSS
 * @param css - The CSS/preprocessor code to compile
 * @param lang - The language type ('css' | 'scss' | 'less' | 'styl')
 * @param filepath - The file path for resolving imports and relative paths.
 *                   In plugin mode, this should always be provided by the build tool.
 * @param globalCss - Global CSS configuration for preprocessors
 * @returns Compiled CSS string or original CSS if no compilation needed
 */
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
