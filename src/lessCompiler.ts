export async function lessCompiler(
  css: string,
  filepath: string,
  globalCss?: string,
  debug?: boolean,
) {
  if (typeof window !== 'undefined')
    throw new Error('lessCompiler is not supported in this browser')

  if (debug) {
    console.log(
      `[transform-to-tailwindcss] Compiling LESS file: ${filepath || 'unknown file'}`,
    )
  }

  let result = globalCss ? `${globalCss}${css}` : css

  try {
    // 使用用户项目中的 less 版本（通过 peerDependencies）
    const less = await import('less')
    const { LessPluginModuleResolver } = await import(
      'less-plugin-module-resolver'
    )

    result = (
      await less.default.render(result, {
        filename: filepath,
        plugins: [
          new LessPluginModuleResolver({
            alias: {},
          }),
        ],
      })
    ).css
    return result
  }
  catch (error: any) {
    if (
      error.code === 'MODULE_NOT_FOUND'
      || error.message.includes('Cannot resolve module')
    ) {
      const missingModule = error.message.includes(
        'less-plugin-module-resolver',
      )
        ? 'less-plugin-module-resolver'
        : 'less'
      throw new Error(
        `${missingModule} not found. Please install it in your project:\n`
        + `npm install ${missingModule}\n`
        + `or\n`
        + `yarn add ${missingModule}\n`
        + `or\n`
        + `pnpm add ${missingModule}`,
      )
    }
    console.error(
      `Error:\n transform-to-unocss(lessCompiler) ${error.toString()}`,
    )
  }
}
