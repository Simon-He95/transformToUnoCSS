export function wrapperVueTemplate(template: string, css?: string) {
  let _template = /<template>/.test(template)
    ? template.replace(/\n+/g, '\n')
    : `<template>
  ${template}
</template>`

  _template = /<style scoped>/.test(_template)
    ? _template.replace('</style>', `\n${css}<\/style>`)
    : `${_template}\n<style scoped>
${css}
</style>`
  return `${_template}`
}
