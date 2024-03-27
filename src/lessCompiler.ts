import path from 'path'

export async function lessCompiler(
  css: string,
  filepath?: string,
  globalCss?: string,
  alias?: { [key: string]: string },
) {
  if (typeof window !== 'undefined')
    throw new Error('lessCompiler is not supported in this browser')
  const { LessPluginModuleResolver } = await import(
    'less-plugin-module-resolver'
  )

  let result = globalCss
    ? `${globalCss.replace(/@(?:include|import)\s+["']([^"']*)['"]/g, (_, v) =>
        _.replace(v, path.resolve(process.cwd(), v)),
      )}${css}`
    : css
  try {
    result = (
      await (
        await import('less')
      ).default.render(result, {
        filename: filepath,
        plugins: [
          new LessPluginModuleResolver({
            alias: alias || {},
          }),
        ],
      })
    ).css
    return result
  }
  catch (error: any) {
    console.error(
      `Error:\n transform-to-unocss(lessCompiler) ${error.toString()}`,
    )
  }
}
