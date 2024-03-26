export async function lessCompiler(css: string, alias = {}) {
  if (typeof window !== 'undefined')
    throw new Error('lessCompiler is not supported in this browser')
  const { LessPluginModuleResolver } = await import(
    'less-plugin-module-resolver'
  )

  let result = css
  try {
    result = (
      await (
        await import('less')
      ).default.render(css, {
        plugins: [
          new LessPluginModuleResolver({
            alias,
          }),
        ],
      })
    ).css
  }
  catch (error: any) {
    console.error(error.toString())
  }

  return result
}
