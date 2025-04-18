import fsp from 'node:fs/promises'
import path from 'node:path'
import { prettierCode } from './prettierCode'
import { transformVue } from './transformVue'
import { diffTemplateStyle } from './utils'
import { wrapperVueTemplate } from './wrapperVueTemplate'

const linkCssReg = /<link.*href="(.+css)".*>/g
const styleReg = /\s*<style[^>]*>(.*)<\/style>\s*/s

export async function transformHtml(
  code: string,
  filepath?: string,
  isRem?: boolean,
) {
  const css = await getLinkCss(code, filepath!)
  const style = getStyleCss(code)
  const newCode = await generateNewCode(css, style, code, isRem)
  return prettierCode(newCode)
}

async function getLinkCss(code: string, filepath: string) {
  const css = []
  for (const match of code.matchAll(linkCssReg)) {
    try {
      const url = match[0]
      const cssUrl = path.resolve(filepath, '../', match[1])

      css.push({
        url,
        content: await fsp.readFile(cssUrl, 'utf-8'),
      })
    }
    catch (error: any) {
      throw new Error(error.toString())
    }
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
  const match = code.match(/<body[^>]*>.*<\/body>/s)
  if (!match)
    return ''
  return match[0]
}

async function generateNewCode(
  css: { url: string, content: string }[],
  style: string,
  code: string,
  isRem?: boolean,
) {
  // 先处理style
  let template = getBody(code)
  const originBody = template
  if (style) {
    const vue = wrapperVueTemplate(template, style)
    const transferCode = await transformVue(vue, { isJsx: true, isRem })
    template = transferCode

    // 如果没有style scoped 删除style
    if (transferCode.includes('<style scoped></style>'))
      code = code.replace(styleReg, '')
  }
  if (css.length) {
    for (const c of css) {
      const { url, content } = c
      const vue = wrapperVueTemplate(template, content)

      const transferCode = await transformVue(vue, { isJsx: true, isRem })

      if (diffTemplateStyle(template, transferCode)) {
        // 新增的css全部被转换了,这个link可以被移除了
        code = code.replace(url, '')
      }
      else {
        // todo：比对已经转换的属性，移除无用的属性
      }
      template = transferCode
    }
  }

  return code.replace(originBody, getBody(template))
}
