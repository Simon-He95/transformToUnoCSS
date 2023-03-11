import { parse } from 'vue/compiler-sfc'

const emptyStyle = /<style[\s\w'=]*>([\n\s]*)/

export function prettierCode(code: string) {
  const {
    descriptor: { styles },
  } = parse(code)

  if (!styles.length) {
    return code
      .replace(emptyStyle, (all, v) => all.replace(v, ''))
      .replace(/\n+/g, '\n')
  }

  const { content } = styles[0]
  return code.replace(content, content.replace(/\n+/g, '\n'))
}
