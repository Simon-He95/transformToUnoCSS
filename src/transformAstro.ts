import { prettierCode } from './prettierCode'
import { transformVue } from './transformVue'
import { wrapperVueTemplate } from './wrapperVueTemplate'

export async function transformAstro(code: string, isRem?: boolean) {
  const match = code.match(/(---.*---)?(.*(?=<style>))(<style>.*<\/style>)?/s)
  if (!match)
    return code
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_all, _js, template, css] = match
  const _css = css ? css.replace(/<style>(.*)<\/style>/s, '$1') : ''
  const _template = wrapperVueTemplate(template, _css)
  const vue = await transformVue(_template, { isJsx: true, isRem })
  vue.replace(
    /<template>(.*)<\/template>[\n\s]*<style scoped>(.*)<\/style>/s,
    (_, newTemplate, newCss) =>
      (code = code.replace(template, newTemplate).replace(css, newCss)),
  )

  return prettierCode(code)
}
