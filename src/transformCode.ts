import fs from 'fs'
import path from 'path'
import { parse } from 'vue/compiler-sfc'
import { parse as babelParse, traverse as babelTraverse } from '@babel/core'
import vueJsxPlugin from '@vue/babel-plugin-jsx'
import typescriptPlugin from '@babel/plugin-transform-typescript'
import importMeta from '@babel/plugin-syntax-import-meta'
import { transformCss } from './transformCss'
import { tansformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'

export function transfromCode(
  code: string,
  filepath: string,
  type: 'vue' | 'tsx',
) {
  if (type === 'tsx') {
    const ast = babelParse(code, {
      babelrc: false,
      comments: true,
      plugins: [
        importMeta,
        [vueJsxPlugin, {}],
        [typescriptPlugin, { isTSX: true, allowExtensions: true }],
      ],
    })
    let container: any = null
    let css = ''
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
              path.resolve(filepath, '../', value),
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
    let vueTransfer = transformVue(wrapperVue)
    vueTransfer = vueTransfer.replace(/class/g, 'className')
    const jsxTransfer = vueTransfer.match(/<template>(.*)<\/template>/s)![1]
    // todo: 将attribute属性合并到className中
    return code.replace(jsxCode, jsxTransfer)
  }
  return transformVue(code)
}

export function transformVue(code: string) {
  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)

  if (errors.length)
    return code
  // transform inline-style

  code = tansformInlineStyle(code)

  if (!template || !styles.length)
    return code
  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = transformMedia(code)
  code = transferMediaCode
  // transform class
  const {
    attrs: { scoped },
    content: style,
  } = styles[0]

  // 只针对scoped css处理
  if (scoped)
    code = transformCss(style, code)

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
