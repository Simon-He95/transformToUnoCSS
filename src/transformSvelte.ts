import { prettierCode } from './prettierCode'
import { transformVue } from './transformVue'
import { wrapperVueTemplate } from './wrapperVueTemplate'

export function transformSvelte(code: string): Promise<string> {
  return new Promise((resolve, _reject) => {
    code.replace(
      /(<script.*<\/script>)?(.*(?=<style>))(<style>.*<\/style>)?/s,
      async (_all: string, _js: string, template: string, css: string) => {
        const _css = css ? css.replace(/<style>(.*)<\/style>/s, '$1') : ''
        const _template = wrapperVueTemplate(template, _css)
        const vue = await transformVue(_template, true)

        vue.replace(
          /<template>(.*)<\/template>[\n\s]*<style scoped>(.*)<\/style>/s,
          (_, newTemplate, newCss) =>
            (code = code.replace(template, newTemplate).replace(css, newCss)),
        )

        resolve(prettierCode(code))
      },
    )
  })
}
