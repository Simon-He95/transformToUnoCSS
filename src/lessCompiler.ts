export async function lessCompiler(css: string, alias = {}) {
  if (typeof window !== 'undefined')
    throw new Error('lessCompiler is not supported in this browser')
  const { LessPluginModuleResolver } = await (
    await import('less-plugin-module-resolver')
  ).default
  const data = await (
    await import('less')
  ).default.render(css, {
    plugins: [
      new LessPluginModuleResolver({
        alias,
      }),
    ],
  })
  return data.css
}
