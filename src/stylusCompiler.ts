export async function stylusCompiler(css: string) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')
  let result = css
  try {
    result = (await import('stylus')).default.render(css)
  }
  catch (error) {}
  return result
}
