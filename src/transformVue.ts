import type { CssType } from './utils'
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
}

export async function transformVue(code: string, options?: Options) {
  const { isJsx, filepath, isRem, globalCss, debug } = options || {}
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
            firstStyle: styles[0],
          },
          null,
          2,
        ),
      )
    }

    // transform class
    const {
      attrs: { scoped },
      content: style,
      lang = 'css',
    } = styles[0]

    const css = await compilerCss(style, lang as CssType, filepath, globalCss)
    if (css) {
      if (debug) {
        console.log(
          '[DEBUG] CSS compiled successfully:',
          JSON.stringify(
            {
              originalStyleLength: style.length,
              compiledCssLength: css.length,
              scoped: !!scoped,
            },
            null,
            2,
          ),
        )
      }

      // 能被正确编译解析的css
      code = code.replace(style, `\n${css}\n`).replace(` lang="${lang}"`, '')
      // 只针对scoped css处理
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
