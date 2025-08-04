import type { CssType } from './type'
import process from 'node:process'
import { lessCompiler } from './lessCompiler'
import { sassCompiler } from './sassCompiler'
import { stylusCompiler } from './stylusCompiler'
import { isNodeEnvironment } from './utils'

export function compilerCss(
  css: string,
  lang: CssType,
  filepath: string = isNodeEnvironment() ? process.cwd() : '',
  globalCss?: string,
  debug?: boolean,
) {
  // 添加输入验证
  if (typeof css !== 'string') {
    if (debug) {
      console.warn(
        `[transform-to-unocss] compilerCss received non-string CSS input: ${typeof css}, filepath: ${filepath}`,
      )
    }
    return String(css || '')
  }

  // 验证语言类型
  if (!['stylus', 'less', 'scss', 'css'].includes(lang)) {
    if (debug) {
      console.warn(
        `[transform-to-unocss] compilerCss received unknown language: ${lang}, filepath: ${filepath}`,
      )
    }
    return css
  }

  switch (lang) {
    case 'stylus':
      return stylusCompiler(css, filepath, globalCss, debug)
    case 'less':
      return lessCompiler(css, filepath, globalCss, debug)
    case 'scss':
      return sassCompiler(css, filepath, globalCss, debug)
    default:
      return css
  }
}
