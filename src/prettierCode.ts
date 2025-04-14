import { getVueCompilerSfc } from './utils'

const emptyStyle = /<style[\s\w'=]*>(\s*)/

export async function prettierCode(code: string) {
  const { parse } = await getVueCompilerSfc()
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
