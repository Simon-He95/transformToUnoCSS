import { parse } from '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'

const emptyStyle = /<style[\s\w'=]*>(\s+)/

export async function prettierCode(code: string) {
  const {
    descriptor: { styles },
  } = parse(code)

  if (!styles.length) {
    return code
      .replace(emptyStyle, (all, v) => all.replace(v, ''))
      .replace(/\n+/g, '\n')
  }

  const { content } = styles[0]
  return code.replace(content, removeEmptyStyle(content.replace(/\n+/g, '\n')))
}

export function removeEmptyStyle(code: string) {
  return code.replace(/([\w.#:[\]="'\-\s,>~]+)\{\s*\}/g, '')
}
