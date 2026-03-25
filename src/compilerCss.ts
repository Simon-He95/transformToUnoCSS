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
  globalCss?: any,
  debug?: boolean,
  resolveAlias?: any,
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

  const normalizedGlobalCss = getGlobalCssByLang(globalCss, lang)

  switch (lang) {
    case 'stylus':
      return stylusCompiler(
        css,
        filepath,
        normalizedGlobalCss,
        debug,
        resolveAlias,
      )
    case 'less':
      return lessCompiler(
        css,
        filepath,
        normalizedGlobalCss,
        debug,
        resolveAlias,
      )
    case 'scss':
      return sassCompiler(
        css,
        filepath,
        normalizedGlobalCss,
        debug,
        resolveAlias,
      )
    default:
      return css
  }
}

function getGlobalCssByLang(globalCss: any, lang: CssType) {
  if (globalCss == null || typeof globalCss === 'string')
    return globalCss

  if (typeof globalCss !== 'object')
    return globalCss

  if ('css' in globalCss) {
    return typeof globalCss.css === 'string' ? globalCss.css : undefined
  }

  const langConfig
    = globalCss[lang] ?? (lang === 'scss' ? globalCss.sass : undefined)

  if (typeof langConfig === 'string')
    return langConfig

  if (
    langConfig
    && typeof langConfig === 'object'
    && typeof langConfig.additionalData === 'string'
  ) {
    return langConfig.additionalData
  }

  return undefined
}
