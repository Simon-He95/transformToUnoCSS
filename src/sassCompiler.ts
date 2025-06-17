import path from 'node:path'
import process from 'node:process'
import * as Url from 'node:url'

export async function sassCompiler(
  css: string,
  filepath?: string,
  globalCss?: string,
) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')

  const baseDir = filepath ? path.dirname(filepath) : process.cwd()

  // 辅助函数：处理路径转换
  const processPathInContent = (content: string) => {
    let processed = content

    // 处理基本的 @use, @forward, @include, @import 指令
    processed = processed.replace(
      /@(?:use|forward|include|import)\s+["']([^"']*)['"]/g,
      (match, filePath) => {
        // 跳过内置 Sass 模块 (sass:*, pkg:* 等)
        if (filePath.includes(':')) {
          return match
        }
        const resolvedPath = path.resolve(baseDir, filePath)
        return match.replace(filePath, Url.pathToFileURL(resolvedPath) as any)
      },
    )

    // 处理 @use 的扩展语法：@use "path" as namespace 或 @use "path" with (...)
    processed = processed.replace(
      /@use\s+["']([^"']*)['"]\s+(?:as\s+\w+\*?|with\s*\([^)]*\))/g,
      (match, filePath) => {
        // 跳过内置 Sass 模块
        if (filePath.includes(':')) {
          return match
        }
        const resolvedPath = path.resolve(baseDir, filePath)
        return match.replace(filePath, Url.pathToFileURL(resolvedPath) as any)
      },
    )

    // 处理 @forward 的扩展语法：@forward "path" show/hide/as
    processed = processed.replace(
      /@forward\s+["']([^"']*)['"]\s*(?:show\s+[^;]+|hide\s+[^;]+|as\s+[^;]+)/g,
      (match, filePath) => {
        // 跳过内置 Sass 模块
        if (filePath.includes(':')) {
          return match
        }
        const resolvedPath = path.resolve(baseDir, filePath)
        return match.replace(filePath, Url.pathToFileURL(resolvedPath) as any)
      },
    )

    return processed
  }

  // 处理 globalCss 和当前 CSS
  let result = ''
  if (globalCss) {
    result += processPathInContent(globalCss)
  }
  result += processPathInContent(css)
  try {
    const sass = await import('sass')
    result = sass.compileString(
      result,
      filepath
        ? {
            importers: [
              {
                findFileUrl(url) {
                  // 处理波浪号路径 (~)
                  if (url.startsWith('~')) {
                    return new URL(
                      url.slice(1),
                      Url.pathToFileURL(baseDir) as URL,
                    )
                  }
                  // 处理相对路径
                  if (!url.startsWith('/') && !url.includes('://')) {
                    return new URL(url, Url.pathToFileURL(baseDir) as URL)
                  }
                  // 处理绝对路径
                  return new URL(url, Url.pathToFileURL(baseDir) as URL)
                },
              },
            ],
            // 启用现代 Sass API
            syntax: 'scss',
            // 支持 @use 和 @forward
            loadPaths: [baseDir, process.cwd()],
          }
        : {
            syntax: 'scss',
            loadPaths: [process.cwd()],
          },
    ).css
    return result
  }
  catch (error: any) {
    console.error(
      `Error:\n transform-to-unocss(sassCompiler) ${error.toString()}`,
    )
  }
}
