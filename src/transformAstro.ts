import { prettierCode } from './prettierCode'
import { transformVue } from './transformVue'
import { wrapperVueTemplate } from './wrapperVueTemplate'

interface Options {
  filepath?: string
  isRem?: boolean
  globalCss?: any
  debug?: boolean
}

export async function transformAstro(code: string, options?: Options) {
  const { filepath, isRem, globalCss, debug = false } = options || {}
  const match = code.match(/(---.*---)?(.*(?=<style>))(<style>.*<\/style>)?/s)
  if (!match)
    return code

  const [_all, _js, template, css] = match
  const _css = css ? css.replace(/<style>(.*)<\/style>/s, '$1') : ''
  const _template = wrapperVueTemplate(template, _css)
  const vue = await transformVue(_template, {
    isJsx: true,
    isRem,
    globalCss,
    filepath,
    debug,
  })
  vue.replace(
    /<template>(.*)<\/template>\s*<style scoped>(.*)<\/style>/s,
    (_, newTemplate, newCss) =>
      (code = code.replace(template, newTemplate).replace(css, newCss)),
  )

  return prettierCode(code)
}
