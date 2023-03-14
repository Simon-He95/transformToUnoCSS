import sass from 'sass'
export function sassCompiler(css: string) {
  const result = sass.compileString(css)
  return result.css
}
// const input = `
// h1 {
//   font-size: 40px;
//   code {
//     font-face: Roboto Mono;
//   }
// }`

// sassCompiler(input)
