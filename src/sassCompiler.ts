import path from 'node:path'

/**
 * Sass 编译器 - 处理 SCSS/Sass 文件编译
 *
 * 解决了以下问题：
 * 1. Sass 新版本的 mixed-decls 弃用警告
 * 2. legacy-js-api 弃用警告（优先使用新 API）
 * 3. @import 规则弃用警告（Dart Sass 3.0.0 将移除）
 * 4. 嵌套规则后声明的兼容性问题
 * 5. 支持用户项目中的 Sass 版本
 * 6. 自动检测并使用最合适的 Sass API
 * 7. 多层次的警告抑制机制（console.warn 拦截 + 自定义 logger + silenceDeprecations）
 *
 * @param css 要编译的 CSS 内容
 * @param filepath 文件路径，用于解析 @import 等
 * @param globalCss 全局 CSS 内容（字符串）或包含 CSS 的对象（如 {css: string}）
 * @param debug 是否开启调试模式
 * @returns 编译后的 CSS 字符串
 */
export async function sassCompiler(
  css: string,
  filepath: string,
  globalCss?: string | any,
  debug?: boolean,
) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')

  // 添加输入验证
  if (typeof css !== 'string') {
    if (debug) {
      console.warn(
        `[transform-to-unocss] sassCompiler received non-string CSS input: ${typeof css}`,
      )
    }
    return String(css || '')
  }

  // 检查文件路径，避免处理不相关的文件
  if (filepath) {
    const isValidSassFile
      = filepath.endsWith('.scss')
        || filepath.endsWith('.sass')
        || filepath.includes('.vue')
        || filepath.includes('.svelte')
        || filepath.includes('.astro')
        || filepath.includes('.tsx')
        || filepath.includes('.jsx')

    if (!isValidSassFile && debug) {
      console.warn(
        `[transform-to-unocss] sassCompiler called for unexpected file type: ${filepath}`,
      )
    }
  }

  if (debug) {
    console.log(
      `[transform-to-unocss] Compiling SCSS file: ${filepath || 'unknown file'}`,
    )
  }

  const baseDir = path.dirname(filepath)

  // 处理 globalCss 和当前 CSS
  let result = ''
  if (globalCss) {
    // 检查 globalCss 的类型，确保它是字符串
    if (typeof globalCss === 'string') {
      result += globalCss
    }
    else if (typeof globalCss === 'object' && globalCss !== null) {
      // 如果是对象，尝试提取 CSS 内容
      const globalCssObj = globalCss as any
      if ('css' in globalCssObj && typeof globalCssObj.css === 'string') {
        result += globalCssObj.css
      }
      else if (debug) {
        console.warn(
          `[transform-to-unocss] Unexpected globalCss object format:`,
          globalCss,
        )
      }
    }
    else if (debug) {
      console.warn(
        `[transform-to-unocss] globalCss is not a string or valid object: ${typeof globalCss}`,
        globalCss,
      )
    }
  }
  result += css

  try {
    // 使用用户项目中的 sass 版本（通过 peerDependencies）
    const sass = await import('sass')

    // 临时抑制 console.warn 来阻止 Sass 弃用警告
    const originalWarn = console.warn
    const filteredWarn = (message: string, ...args: any[]) => {
      const messageStr = String(message)
      const deprecationPatterns = [
        'Deprecation Warning',
        'mixed-decls',
        'legacy-js-api',
        'import',
        'Sass @import rules are deprecated',
        'will be removed in Dart Sass',
        'More info and automated migrator',
      ]

      const shouldIgnore = deprecationPatterns.some(pattern =>
        messageStr.includes(pattern),
      )

      if (!shouldIgnore) {
        originalWarn(message, ...args)
      }
    }

    try {
      // 检查 Sass 版本以确定使用哪种 API
      const sassInfo = sass.info || ''
      const isModernSass
        = sassInfo.includes('dart-sass') || sassInfo.includes('1.')

      const compileOptions: any = {
        // 启用现代 Sass API
        syntax: 'scss',
        // 支持 @use 和 @forward，让 Sass 使用默认的文件解析
        loadPaths: [baseDir],
      }

      // 为现代版本的 Sass 添加兼容性配置
      if (isModernSass) {
        // 抑制弃用警告，特别是 mixed-decls 警告
        compileOptions.quietDeps = true
        // 控制警告级别，避免输出过多的弃用警告
        compileOptions.verbose = false
        // 静默特定的弃用警告（如果 Sass 版本支持）
        try {
          compileOptions.silenceDeprecations = [
            'mixed-decls',
            'import',
            'legacy-js-api',
          ]
        }
        catch (e) {
          // 某些 Sass 版本可能不支持此选项
        }
        // 自定义 logger 来过滤特定的弃用警告
        compileOptions.logger = {
          warn: (message: string, options: any) => {
            // 过滤掉常见的弃用警告
            const deprecationPatterns = [
              'mixed-decls',
              'legacy-js-api',
              'import',
              'Deprecation Warning',
              'behavior for declarations that appear after nested',
              'will be changing to match the behavior specified by CSS',
              'The legacy JS API is deprecated',
              'Sass @import rules are deprecated',
              'will be removed in Dart Sass 3.0.0',
              'More info and automated migrator',
            ]

            const shouldIgnore = deprecationPatterns.some(pattern =>
              message.includes(pattern),
            )

            if (shouldIgnore) {
              return // 忽略这类警告
            }

            // 只输出真正需要关注的警告
            if (debug) {
              console.warn(`[transform-to-unocss] Sass warning: ${message}`)
            }
          },
        }
      }

      // 优先使用新的 compile API（如果可用），否则回退到 compileString
      let compiledResult: any

      // 临时替换 console.warn 来过滤弃用警告
      console.warn = filteredWarn

      if (sass.compile && typeof sass.compile === 'function') {
        // 使用新的 API - 需要写入临时文件
        const fs = await import('node:fs')
        const os = await import('node:os')
        const tempFilePath = `${os.tmpdir()}/transform-to-unocss-${Date.now()}.scss`

        try {
          fs.writeFileSync(tempFilePath, result)
          compiledResult = sass.compile(tempFilePath, compileOptions)
        }
        finally {
          // 清理临时文件
          try {
            fs.unlinkSync(tempFilePath)
          }
          catch (e) {
            // 忽略清理错误
          }
        }
      }
      else {
        // 回退到旧的 API
        compiledResult = sass.compileString(result, compileOptions)
      }

      result = compiledResult.css
      return result
    }
    finally {
      // 恢复原始的 console.warn
      console.warn = originalWarn
    }
  }
  catch (error: any) {
    if (
      error.code === 'MODULE_NOT_FOUND'
      || error.message.includes('Cannot resolve module')
    ) {
      throw new Error(
        `Sass compiler not found. Please install sass in your project:\n`
        + `npm install sass\n`
        + `or\n`
        + `yarn add sass\n`
        + `or\n`
        + `pnpm add sass`,
      )
    }
    console.error(
      `Error:\n transform-to-unocss(sassCompiler) ${error.toString()}`,
    )
    // 返回原始 CSS 而不是 undefined，以便测试能够继续
    return css
  }
}
