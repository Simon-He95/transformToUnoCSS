import { transformAstro } from './transformAstro'
import { transformHtml } from './transformHtml'
import { transformJsx } from './transformJsx'
import { transformSvelte } from './transformSvelte'
import { transformVue } from './transformVue'
import type { SuffixType } from './type'

interface Options {
  isRem?: boolean
  filepath?: string
  type?: SuffixType
  isJsx?: boolean
  globalCss?: any
}

export async function transfromCode(code: string, options: Options) {
  const { filepath, isRem, type, isJsx = false, globalCss } = options || {}
  // 删除代码中的注释部分
  // code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  if (type === 'tsx')
    return transformJsx(code, filepath, isRem, globalCss)
  if (type === 'html')
    return transformHtml(code, filepath, isRem)
  if (type === 'svelte')
    return transformSvelte(code, isRem, globalCss)
  if (type === 'astro')
    return transformAstro(code, isRem, globalCss)

  return transformVue(code, { isJsx, filepath, isRem, globalCss })
}
