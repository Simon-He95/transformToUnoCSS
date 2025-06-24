import path from 'node:path'

export async function sassCompiler(
  css: string,
  filepath: string,
  globalCss?: string,
  debug?: boolean,
) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')

  if (debug) {
    console.log(
      `[transform-to-tailwindcss] Compiling SCSS file: ${filepath || 'unknown file'}`,
    )
  }

  const baseDir = path.dirname(filepath)

  // 处理 globalCss 和当前 CSS
  let result = ''
  if (globalCss) {
    result += globalCss
  }
  result += css

  try {
    // 使用用户项目中的 sass 版本（通过 peerDependencies）
    const sass = await import('sass')

    result = sass.compileString(result, {
      // 启用现代 Sass API
      syntax: 'scss',
      // 支持 @use 和 @forward，让 Sass 使用默认的文件解析
      loadPaths: [baseDir],
    }).css
    return result
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
  }
}
