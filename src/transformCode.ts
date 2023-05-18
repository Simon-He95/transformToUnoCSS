import { transformHtml } from './transformHtml'
import { transformJsx } from './transformJsx'
import { transformSvelte } from './transformSvelte'
import { transformVue } from './transformVue'
import type { SuffixType } from './type'

export async function transfromCode(
  code: string,
  filepath?: string,
  type?: SuffixType,
) {
  // 删除代码中的注释部分
  // code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  if (type === 'tsx')
    return transformJsx(code, filepath)
  if (type === 'html')
    return transformHtml(code, filepath)
  if (type === 'svelte')
    return transformSvelte(code)

  return transformVue(code, false, filepath)
}
