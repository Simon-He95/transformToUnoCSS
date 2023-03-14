import less from 'less'
import { LessPluginModuleResolver } from 'less-plugin-module-resolver'

export async function lessCompiler(css: string, alias = {}) {
  const data = await less.render(css, {
    plugins: [
      new LessPluginModuleResolver({
        alias,
      }),
    ],
  })
  return data.css
}
