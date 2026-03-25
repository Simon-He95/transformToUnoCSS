import type { CssType } from './type'
import { compilerCss } from './compilerCss'
import { prettierCode } from './prettierCode'
import { transformCss } from './transformCss'
import { transformInlineStyle } from './transformInlineStyle'
import { transformMedia } from './transformMedia'
import { getVueCompilerSfc } from './utils' // 从utils引入公共函数

interface Options {
  isJsx?: boolean
  filepath?: string
  isRem?: boolean
  globalCss?: any
  debug?: boolean
  resolveAlias?: any
}

export async function transformVue(code: string, options?: Options) {
  const { isJsx, filepath, isRem, globalCss, debug, resolveAlias }
    = options || {}

  // 添加基本的输入验证
  if (typeof code !== 'string') {
    if (debug) {
      console.warn(
        `[transform-to-unocss] transformVue received non-string code: ${typeof code}, filepath: ${filepath}`,
      )
    }
    return String(code || '')
  }

  // 检查文件路径和内容，避免处理非Vue文件
  if (
    filepath
    && !filepath.endsWith('.vue')
    && !code.includes('<template>')
    && !code.includes('<script>')
    && !code.includes('<style>')
  ) {
    if (debug) {
      console.warn(
        `[transform-to-unocss] transformVue called for non-Vue file: ${filepath}`,
      )
    }
    return code
  }

  const { parse } = await getVueCompilerSfc()
  if (debug) {
    console.log(
      '[DEBUG] transformVue started:',
      JSON.stringify(
        {
          filepath,
          isJsx,
          isRem,
          codeLength: code.length,
        },
        null,
        2,
      ),
    )
  }

  const {
    descriptor: { template, styles },
    errors,
  } = parse(code)
  if (errors.length || !template) {
    if (debug && errors.length) {
      console.log('[DEBUG] transformVue parse errors:', errors)
    }
    return code
  }
  // transform inline-style
  code = transformInlineStyle(code, isJsx, isRem, debug)

  if (debug) {
    console.log('[DEBUG] After inline style transformation')
  }

  // transform @media 注：transformBack是将@media中内容用一个占位符替换等到transformCss处理完将结果还原回去
  const [transferMediaCode, transformBack] = await transformMedia(
    code,
    isJsx,
    isRem,
    filepath,
    debug,
    globalCss,
  )

  code = transferMediaCode
  if (styles.length) {
    if (debug) {
      console.log(
        '[DEBUG] Processing styles:',
        JSON.stringify(
          {
            stylesCount: styles.length,
          },
          null,
          2,
        ),
      )
    }

    const stylesCount = styles.length
    for (let index = stylesCount - 1; index >= 0; index--) {
      const currentStyles = parse(code).descriptor.styles
      const currentStyle = currentStyles[index]
      if (!currentStyle)
        break

      const {
        attrs: { scoped },
        content: style,
        lang = 'css',
        loc: { start, end },
      } = currentStyle

      const css = await compilerCss(
        style,
        lang as CssType,
        filepath,
        globalCss,
        debug,
        resolveAlias,
      )
      if (!css)
        continue

      if (debug) {
        console.log(
          '[DEBUG] CSS compiled successfully:',
          JSON.stringify(
            {
              styleIndex: index,
              originalStyleLength: style.length,
              compiledCssLength: css.length,
              scoped: !!scoped,
            },
            null,
            2,
          ),
        )
      }

      code = `${code.slice(0, start.offset)}\n${css}\n${code.slice(end.offset)}`

      if (lang !== 'css') {
        const styleTagStart = code.lastIndexOf('<style', start.offset)
        const styleTagEnd = code.indexOf('>', styleTagStart)
        if (styleTagStart !== -1 && styleTagEnd !== -1) {
          const styleTag = code.slice(styleTagStart, styleTagEnd + 1)
          const nextStyleTag = styleTag.replace(/\s+lang=(['"]).*?\1/, '')
          if (nextStyleTag !== styleTag) {
            code = `${code.slice(0, styleTagStart)}${nextStyleTag}${code.slice(styleTagEnd + 1)}`
          }
        }
      }

      if (scoped) {
        code = await transformCss(
          css,
          code,
          '',
          isJsx,
          filepath,
          isRem,
          debug,
          globalCss,
          resolveAlias,
          index,
        )
      }
    }
  }

  // 还原@media 未匹配到的class
  code = transformBack(code)

  if (debug) {
    console.log(
      '[DEBUG] transformVue completed:',
      JSON.stringify(
        {
          finalCodeLength: code.length,
        },
        null,
        2,
      ),
    )
  }

  return prettierCode(code)
}
