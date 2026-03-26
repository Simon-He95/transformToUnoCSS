import path from 'node:path'
import process from 'node:process'

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
  resolveAlias?: any,
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
  if (result)
    result += '\n'
  result += css

  if (process.env.DEBUG_SASS) {
    console.log(
      '[transform-to-unocss] [sassCompiler] globalCss type:',
      typeof globalCss,
    )

    console.log(
      '[transform-to-unocss] [sassCompiler] result before replace length:',
      result.length,
    )

    console.log(
      '[transform-to-unocss] [sassCompiler] result before replace snippet:',
      result.slice(0, 200),
    )
  }

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
        // 同时添加项目 src 目录到 loadPaths，方便解析 '@/...' 别名
        loadPaths: [baseDir, path.resolve(process.cwd(), 'src')],
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

      // 在编译前，尝试将源码中以 '@/...' 或 '~@/...' 开头的别名导入替换为可解析的绝对路径。
      // 这能解决在没有构建别名解析器（如 vite/webpack）的环境中，Sass 无法直接解析别名的问题。
      const fs = await import('node:fs')

      const replaceAliasImports = (source: string) => {
        const importRegex = /@(import|use|forward)\s+(['"])(~?@\/[\w\-./]+)\2/g

        const resolveAliasLocal = (impPath: string) => {
          const getAliasSuffix = (find: string) =>
            impPath.slice(find.length).replace(/^\/+/, '')

          // impPath like '@/styles/foo' or '~@/styles/foo'
          const rel = impPath.replace(/^~?@\//, '')
          // If we have a resolver map from Vite/Rollup, try to resolve via it
          try {
            if (resolveAlias) {
              // config.resolve.alias can be array or object
              if (Array.isArray(resolveAlias)) {
                for (const a of resolveAlias) {
                  // { find, replacement }
                  if (
                    typeof a.find === 'string'
                    && impPath.startsWith(a.find)
                  ) {
                    return path.resolve(a.replacement, getAliasSuffix(a.find))
                  }
                  if (a.find instanceof RegExp) {
                    const m = impPath.match(a.find)
                    if (m)
                      return impPath.replace(a.find, a.replacement)
                  }
                }
              }
              else if (typeof resolveAlias === 'object') {
                for (const key of Object.keys(resolveAlias)) {
                  if (impPath.startsWith(key)) {
                    return path.resolve(resolveAlias[key], getAliasSuffix(key))
                  }
                }
              }
            }
          }
          catch (e) {
            // ignore resolver errors and fallback
            if (debug)
              console.warn('[transform-to-unocss] resolveAlias failed', e)
          }
          const candidateSrc = path.resolve(process.cwd(), 'src', rel)
          const candidateRoot = path.resolve(process.cwd(), rel)

          const exts = ['', '.scss', '.sass', '.css']
          const underscoreVariants = (p: string) => {
            const dir = path.dirname(p)
            const base = path.basename(p)
            return path.join(dir, `_${base}`)
          }

          const tryPaths = (base: string) => {
            for (const e of exts) {
              const p1 = base + e
              if (fs.existsSync(p1))
                return p1
              const p2 = underscoreVariants(base) + e
              if (fs.existsSync(p2))
                return p2
            }
            return null
          }

          // Prefer src-based resolution
          let found = tryPaths(candidateSrc)
          if (found)
            return found

          found = tryPaths(candidateRoot)
          if (found)
            return found

          // 最后回退到 src 路径（即使文件可能不存在），让 Sass 去进一步解析
          return candidateSrc
        }

        return source.replace(importRegex, (match, kw, quote, impPath) => {
          try {
            const resolved = resolveAliasLocal(impPath)
            if (resolved && resolved !== impPath) {
              // ensure resolved is absolute-ish; if it's relative, resolve from cwd
              let finalPath = resolved
              try {
                // If resolved looks like a path (contains /) but is not absolute, make it absolute
                if (!path.isAbsolute(finalPath)) {
                  finalPath = path.resolve(process.cwd(), finalPath)
                }
              }
              catch (e) {
                // keep original resolved if path ops fail
              }

              // Normalize to forward slashes for Sass compatibility on Windows
              finalPath = finalPath.replace(/\\/g, '/')

              if (debug) {
                console.log(
                  `[transform-to-unocss] Rewriting ${kw} ${impPath} -> ${finalPath}`,
                )
              }
              return `@${kw} ${quote}${finalPath}${quote}`
            }
          }
          catch (e) {
            // Ignore resolution errors and leave original import
            if (debug)
              console.warn('[transform-to-unocss] alias resolution error', e)
          }

          return match
        })
      }

      // 在编译前把 alias 导入替换并准备要编译的源
      const sourceToCompile = replaceAliasImports(result)

      // 可选调试：打印最终传入 Sass 的源码，方便定位 globalCss 是否被包含
      if (process.env.DEBUG_SASS) {
        console.log(
          '[transform-to-unocss] [sassCompiler] sourceToCompile:',
          sourceToCompile,
        )
      }

      // 优先使用新的 compile API（如果可用），否则回退到 compileString
      let compiledResult: any

      // 临时替换 console.warn 来过滤弃用警告
      console.warn = filteredWarn

      if (sass.compile && typeof sass.compile === 'function') {
        // 使用新的 API - 需要写入临时文件
        const os = await import('node:os')
        const tempDirPath = fs.mkdtempSync(
          path.join(os.tmpdir(), 'transform-to-unocss-'),
        )
        const tempFilePath = path.join(tempDirPath, 'input.scss')

        try {
          fs.writeFileSync(tempFilePath, sourceToCompile)
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
          try {
            fs.rmdirSync(tempDirPath)
          }
          catch (e) {
            // 忽略清理错误
          }
        }
      }
      else {
        // 回退到旧的 API
        compiledResult = sass.compileString(sourceToCompile, compileOptions)
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
