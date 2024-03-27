export async function stylusCompiler(css: string, filepath?: string) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')
  let result = css
  try {
    result = (await import('stylus')).default.render(css, {
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
