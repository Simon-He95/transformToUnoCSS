export async function stylusCompiler(css: string) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')

  return (await import('stylus')).default.render(css)
}
