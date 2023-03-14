export async function stylusCompiler(css: string) {
  return (await import('stylus')).default.render(css)
}
