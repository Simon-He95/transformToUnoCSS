import { transformJsx } from './transformJsx'
import { transformVue } from './transformVue'

export async function transfromCode(
  code: string,
  filepath?: string,
  type?: 'vue' | 'tsx',
) {
  if (type === 'tsx')
    return transformJsx(code, filepath)

  return transformVue(code)
}
