export async function stylusCompiler(
  css: string,
  filepath: string,
  globalCss?: string,
  debug?: boolean,
) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')

  if (debug) {
    console.log(
      `[transform-to-tailwindcss] Compiling Stylus file: ${filepath || 'unknown file'}`,
    )
  }

  let result = globalCss ? `${globalCss}${css}` : css

  try {
    // 使用用户项目中的 stylus 版本（通过 peerDependencies）
    const stylus = await import('stylus')

    result = stylus.default.render(result, {
      filename: filepath,
    })
    return result
  }
  catch (error: any) {
    if (
      error.code === 'MODULE_NOT_FOUND'
      || error.message.includes('Cannot resolve module')
    ) {
      throw new Error(
        `Stylus compiler not found. Please install stylus in your project:\n`
        + `npm install stylus\n`
        + `or\n`
        + `yarn add stylus\n`
        + `or\n`
        + `pnpm add stylus`,
      )
    }
    console.error(
      `Error:\n transform-to-unocss(stylusCompiler) ${error.toString()}`,
    )
  }
}
