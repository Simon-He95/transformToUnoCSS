import stylus from 'stylus'
export function stylusCompiler(css: string) {
  return stylus.render(css)
}
