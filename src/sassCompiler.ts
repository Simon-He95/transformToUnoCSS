// import { compileString } from 'sass'
export async function sassCompiler(css: string) {
  const result = (await import('sass')).default.compileString(css)
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
