import fs from 'fs'
import path from 'path'
import { parse } from 'vue/compiler-sfc'
import { parse as babelParse, traverse as babelTraverse } from '@babel/core'
import vueJsxPlugin from '@vue/babel-plugin-jsx'
import { transformCss } from './transformCss'
import { tansformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

export async function transfromCode(
  code: string,
  filepath: string,
  type: 'vue' | 'tsx',
) {
  if (type === 'tsx') {
    const ast = babelParse(code, {
      babelrc: false,
      comments: true,
      plugins: [[vueJsxPlugin]],
    })

    let container: any = null
    let css = ''
    let cssPath = ''
    babelTraverse(ast, {
      enter({ node }: any) {
        if (node.type === 'JSXElement') {
          if (container)
            return
          container = node
        }
        if (node.type === 'ImportDeclaration') {
          const value = node.source.value
          if (value.endsWith('.css')) {
            css += fs.readFileSync(
              (cssPath = path.resolve(filepath, '../', value)),
              'utf-8',
            )
          }
        }
      },
    })
    const jsxCode = code.slice(container.start, container.end)

    const wrapperVue = `<template>${jsxCode.replace(
      /className/g,
      'class',
    )}</template>
    <style scoped>
    ${css}
    </style>`

    let vueTransfer = await transformVue(wrapperVue, true)
    vueTransfer = vueTransfer.replace(/class/g, 'className')
    if (cssPath) {
      const cssTransfer = vueTransfer.match(/<style scoped>(.*)<\/style>/s)![1]
      fs.promises.writeFile(
        cssPath.replace('.css', '.__unocss_transfer__.css'),
        cssTransfer,
        'utf-8',
      )
    }
    const jsxTransfer = vueTransfer.match(/<template>(.*)<\/template>/s)![1]
    return code.replace(jsxCode, jsxTransfer)
  }
  return transformVue(code)
}

export async function transformVue(code: string, isJsx?: boolean) {
  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)

  if (errors.length)
    return code
  // transform inline-style

  code = tansformInlineStyle(code, isJsx)

  if (!template || !styles.length)
    return code
  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = await transformMedia(code, isJsx)

  code = transferMediaCode

  // transform class
  const {
    attrs: { scoped },
    content: style,
  } = styles[0]

  // 只针对scoped css处理
  if (scoped)
    code = await transformCss(style, code, '', isJsx)

  // 还原@media 未匹配到的class
  code = transformBack(code)

  return prettier(code)
}

const emptyStyle = /<style[\s\w'=]*>([\n\s]*)/
function prettier(code: string) {
  const {
    descriptor: { styles },
  } = parse(code)

  if (!styles.length)
    return code.replace(emptyStyle, (all, v) => all.replace(v, ''))

  const { content } = styles[0]
  return code.replace(content, content.replace(/\n+/g, '\n'))
}
