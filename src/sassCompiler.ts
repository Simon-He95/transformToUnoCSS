// import { compileString } from 'sass'
export async function sassCompiler(css: string) {
  if (typeof window !== 'undefined')
    throw new Error('sassCompiler is not supported in this browser')
  let result = css
  try {
    result = (await import('sass')).default.compileString(css).css
  }
  catch (err) {}
  return result
}
// const input = `
// h1 {
//   font-size: 40px;
//   code {
//     font-face: Roboto Mono;
//   }
// }`

// sassCompiler(input)
