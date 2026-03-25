import { prettierCode } from './prettierCode'
import { transformVue } from './transformVue'

const STYLE_PLACEHOLDER = '<!-- __TRANSFORM_TO_UNOCSS_STYLE__ -->'

interface Options {
  filepath?: string
  isRem?: boolean
  globalCss?: any
  debug?: boolean
  resolveAlias?: any
}

export async function transformSvelte(code: string, options?: Options) {
  const {
    filepath,
    isRem,
    globalCss,
    debug = false,
    resolveAlias,
  } = options || {}
  const scriptsMatch = code.match(
    /^((?:<script\b[^>]*>[\s\S]*?<\/script>\s*)*)/,
  )
  const scripts = scriptsMatch?.[1] ?? ''
  const rest = code.slice(scripts.length)
  const styleMatch = rest.match(/<style\b([^>]*)>([\s\S]*?)<\/style>/)
  const template = styleMatch
    ? rest.replace(styleMatch[0], STYLE_PLACEHOLDER)
    : rest
  const styleAttrs = styleMatch?.[1] ?? ''
  const style = styleMatch?.[2] ?? ''
  const vueStyleAttrs = getVueStyleAttrs(styleAttrs)
  const vue = await transformVue(
    [
      `<template>${template}</template>`,
      style ? `<style${vueStyleAttrs}>${style}</style>` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    {
      isJsx: true,
      isRem,
      globalCss,
      filepath,
      debug,
      resolveAlias,
    },
  )
  const templateMatch = vue.match(/<template>([\s\S]*?)<\/template>/)
  const transformedStyleMatch = vue.match(/<style\b[^>]*>([\s\S]*?)<\/style>/)
  const outputStyleAttrs = stripCompiledStyleAttrs(styleAttrs)
  const outputStyle = transformedStyleMatch?.[1].trim()
    ? `<style${outputStyleAttrs}>${transformedStyleMatch[1]}</style>`
    : ''
  const outputTemplate = (templateMatch?.[1] ?? template).replace(
    STYLE_PLACEHOLDER,
    outputStyle,
  )
  const output = [scripts, outputTemplate].filter(Boolean).join('\n')

  return prettierCode(output)
}

function getVueStyleAttrs(attrs: string) {
  const normalized = attrs.trim()
  const shouldScope = !/\bscoped\b/.test(normalized)

  return ` ${(shouldScope ? 'scoped ' : '') + normalized}`.trimEnd()
}

function stripCompiledStyleAttrs(attrs: string) {
  const withoutLang = attrs.replace(/\s+lang=(['"]).*?\1/g, '')
  return withoutLang.replace(/\s+scoped\b/g, '')
}
