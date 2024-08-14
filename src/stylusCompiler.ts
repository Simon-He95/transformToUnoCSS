import path from 'node:path'
import * as Url from 'node:url'
import process from 'node:process'

export async function stylusCompiler(
  css: string,
  filepath?: string,
  globalCss?: string,
) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')
  let result = globalCss
    ? `${globalCss.replace(/@(?:include|import)\s+["']([^"']*)['"]/g, (_, v) =>
        _.replace(v, Url.pathToFileURL(path.resolve(process.cwd(), v)) as any))}${css}`
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
