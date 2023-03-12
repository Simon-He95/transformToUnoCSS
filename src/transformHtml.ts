import path from 'path'
import fsp from 'fs/promises'
import { wrapperVueTemplate } from './wrapperVueTemplate'
import { transformVue } from './transformVue'
import { prettierCode } from './prettierCode'
import { diffTemplateStyle } from './utils'
const linkCssReg = /<link.*href="(.*.css)".*>/g
const styleReg = /[\s\n]*<style.*>(.*)<\/style>[\s\n]*/s

export async function transformHtml(code: string, filepath?: string) {
  const css = await getLinkCss(code, filepath!)
  const style = getStyleCss(code)
  const newCode = await generateNewCode(css, style, code)
  return prettierCode(newCode)
}

async function getLinkCss(code: string, filepath: string) {
  const css = []
  for (const match of code.matchAll(linkCssReg)) {
    if (!match)
      continue
    const url = match[0]
    const cssUrl = path.resolve(filepath, '../', match[1])

    css.push({
      url,
      content: await fsp.readFile(cssUrl, 'utf-8'),
    })
  }

  return css
}

function getStyleCss(code: string) {
  const match = code.match(styleReg)
  if (!match)
    return ''
  return match[1]
}

function getBody(code: string) {
  const match = code.match(/<body.*>.*<\/body>/s)
  if (!match)
    return ''
  return match[0]
}

async function generateNewCode(
  css: { url: string; content: string }[],
  style: string,
  code: string,
) {
  // 先处理style
  let template = getBody(code)
  const originBody = template
  if (style) {
    const vue = wrapperVueTemplate(template, style)
    const transferCode = await transformVue(vue, true)
    template = transferCode

    // 如果没有style scoped 删除style
    if (transferCode.includes('<style scoped></style>'))
      code = code.replace(styleReg, '')
  }
  if (css.length) {
    for (const c of css) {
      const { url, content } = c
      const vue = wrapperVueTemplate(template, content)

      const transferCode = await transformVue(vue, true)

      if (diffTemplateStyle(template, transferCode)) {
        // 新增的css全部被转换了,这个link可以被移除了
        code = code.replace(url, '')
      }
      template = transferCode
    }
  }

  return code.replace(originBody, getBody(template))
}
