import path from 'path'

export async function stylusCompiler(
  css: string,
  filepath?: string,
  globalCss?: string,
) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')
  let result = globalCss
    ? `${globalCss.replace(/@(?:include|import)\s+["']([^"']*)['"]/g, (_, v) =>
        _.replace(v, path.resolve(process.cwd(), v)),
      )}${css}`
    : css
  try {
    result = (await import('stylus')).default.render(result, {
      filename: filepath,
    })
    return result
  }
  catch (error: any) {
    console.error(
      `Error:\n transform-to-unocss(stylusCompiler) ${error.toString()}`,
    )
  }
}
