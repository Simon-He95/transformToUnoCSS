import * as Url from 'url'
import process from 'process'
import path from 'path'

export async function sassCompiler(
  css: string,
  filepath?: string,
  globalCss?: string,
) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')
  let result = globalCss
    ? `${globalCss.replace(/@(?:include|import)\s+["']([^"']*)['"]/g, (_, v) =>
        _.replace(v, path.resolve(process.cwd(), v)),
      )}${css}`
    : css
  try {
    result = (await import('sass')).default.compileString(
      result,
      filepath
        ? {
            importers: [
              {
                findFileUrl(url) {
                  if (!url.startsWith('~'))
                    return new URL(url, Url.pathToFileURL(filepath) as URL)
                  return new URL(
                    url.slice(1),
                    Url.pathToFileURL(filepath) as URL,
                  )
                },
              },
            ],
          }
        : {},
    ).css
    return result
  }
  catch (error: any) {
    console.error(
      `Error:\n transform-to-unocss(sassCompiler) ${error.toString()}`,
    )
  }
}

// const input = `
// h1 {
//   font-size: 40px;
//   code {
//     font-face: Roboto Mono;
//   }
// }`

// sassCompiler(input)
