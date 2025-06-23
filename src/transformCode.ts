import type { SuffixType } from './type'
import { transformAstro } from './transformAstro'
import { transformHtml } from './transformHtml'
import { transformJsx } from './transformJsx'
import { transformSvelte } from './transformSvelte'
import { transformVue } from './transformVue'

interface Options {
  isRem?: boolean
  filepath?: string
  type?: SuffixType
  isJsx?: boolean
  globalCss?: any
  debug?: boolean
}

export async function transformCode(code: string, options: Options) {
  const {
    filepath,
    isRem,
    type,
    isJsx = true,
    globalCss,
    debug,
  } = options || {}

  if (debug) {
    console.log(
      '[DEBUG] transformCode started:',
      JSON.stringify({
        filepath,
        type,
        isJsx,
        isRem,
        codeLength: code.length,
      }),
    )
  }

  // 删除代码中的注释部分
  // code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  if (type === 'tsx')
    return transformJsx(code, { filepath, isRem, globalCss, debug })
  if (type === 'html')
    return transformHtml(code, { filepath, globalCss, debug })
  if (type === 'svelte')
    return transformSvelte(code, { filepath, isRem, globalCss, debug })
  if (type === 'astro')
    return transformAstro(code, { filepath, isRem, globalCss, debug })

  return transformVue(code, { isJsx, filepath, isRem, globalCss, debug })
}
