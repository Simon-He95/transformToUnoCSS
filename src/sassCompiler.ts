import { pathToFileURL } from 'url'

export async function sassCompiler(css: string, filepath?: string) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')
  let result = css
  try {
    result = (await import('sass')).default.compileString(
      css,
      filepath
        ? {
            importers: [
              {
                findFileUrl(url) {
                  if (!url.startsWith('~'))
                    return new URL(url, pathToFileURL(filepath) as URL)

                  return new URL(url.slice(1), pathToFileURL(filepath) as URL)
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
