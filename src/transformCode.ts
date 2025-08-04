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

  // 添加输入验证
  if (typeof code !== 'string') {
    if (debug) {
      console.warn(
        `[transform-to-unocss] transformCode received non-string code: ${typeof code}, filepath: ${filepath}`,
      )
    }
    return String(code || '')
  }

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

  // 如果没有指定类型，尝试从文件路径推断
  let detectedType = type
  if (!detectedType && filepath) {
    if (filepath.endsWith('.tsx') || filepath.endsWith('.jsx')) {
      detectedType = 'tsx'
    }
    else if (filepath.endsWith('.html')) {
      detectedType = 'html'
    }
    else if (filepath.endsWith('.svelte')) {
      detectedType = 'svelte'
    }
    else if (filepath.endsWith('.astro')) {
      detectedType = 'astro'
    }
    else if (filepath.endsWith('.vue')) {
      detectedType = 'vue'
    }
  }

  if (debug) {
    console.log(
      `[DEBUG] transformCode detected type: ${detectedType}, original type: ${type}, filepath: ${filepath}`,
    )
  }

  // 如果仍然没有类型且不是Vue文件，直接返回
  if (
    !detectedType
    && filepath
    && !filepath.endsWith('.vue')
    && !code.includes('<template>')
  ) {
    if (debug) {
      console.warn(
        `[transform-to-unocss] transformCode: Unknown file type for ${filepath}, skipping transformation`,
      )
    }
    return code
  }

  // 删除代码中的注释部分
  // code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  if (detectedType === 'tsx') {
    if (debug) {
      console.log(`[DEBUG] transformCode: Processing as TSX file`)
    }
    return transformJsx(code, { filepath, isRem, globalCss, debug })
  }
  if (detectedType === 'html')
    return transformHtml(code, { filepath, globalCss, debug })
  if (detectedType === 'svelte')
    return transformSvelte(code, { filepath, isRem, globalCss, debug })
  if (detectedType === 'astro')
    return transformAstro(code, { filepath, isRem, globalCss, debug })

  // 只有确认是Vue文件或包含Vue语法时才调用transformVue
  if (
    detectedType === 'vue'
    || code.includes('<template>')
    || code.includes('<script>')
    || code.includes('<style>')
  ) {
    if (debug) {
      console.log(`[DEBUG] transformCode: Processing as Vue file`)
    }
    return transformVue(code, { isJsx, filepath, isRem, globalCss, debug })
  }

  // 如果都不匹配，返回原始代码
  if (debug) {
    console.warn(
      `[transform-to-unocss] transformCode: No suitable transformer found for ${filepath}, returning original code`,
    )
  }
  return code
}
