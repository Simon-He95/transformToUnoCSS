import path from 'node:path'
import process from 'node:process'

export async function lessCompiler(
  css: string,
  filepath: string,
  globalCss?: string,
  debug?: boolean,
  resolveAlias?: any,
) {
  if (typeof window !== 'undefined')
    throw new Error('lessCompiler is not supported in this browser')

  if (debug) {
    console.log(
      `[transform-to-tailwindcss] Compiling LESS file: ${filepath || 'unknown file'}`,
    )
  }

  let result = globalCss ? `${globalCss}\n${css}` : css

  try {
    // 使用用户项目中的 less 版本（通过 peerDependencies）
    const less = await import('less')
    const { LessPluginModuleResolver }
      = await import('less-plugin-module-resolver')

    // normalize resolveAlias into plain alias object { find: replacement }
    const aliasObj: Record<string, string> = {}
    try {
      if (resolveAlias) {
        if (Array.isArray(resolveAlias)) {
          for (const a of resolveAlias) {
            if (a && a.find && a.replacement) {
              aliasObj[a.find] = path.isAbsolute(a.replacement)
                ? a.replacement
                : path.resolve(process.cwd(), a.replacement)
            }
          }
        }
        else if (typeof resolveAlias === 'object') {
          for (const k of Object.keys(resolveAlias)) {
            const val = resolveAlias[k]
            aliasObj[k] = path.isAbsolute(val)
              ? val
              : path.resolve(process.cwd(), val)
          }
        }
      }
    }
    catch (e) {
      if (debug) {
        console.warn(
          '[transform-to-unocss] less resolveAlias normalize failed',
          e,
        )
      }
    }

    result = (
      await less.default.render(result, {
        filename: filepath,
        plugins: [
          new LessPluginModuleResolver({
            alias: aliasObj,
          }),
        ],
      })
    ).css
    return result
  }
  catch (error: any) {
    if (
      error.code === 'MODULE_NOT_FOUND'
      || error.message.includes('Cannot resolve module')
    ) {
      const missingModule = error.message.includes(
        'less-plugin-module-resolver',
      )
        ? 'less-plugin-module-resolver'
        : 'less'
      throw new Error(
        `${missingModule} not found. Please install it in your project:\n`
        + `npm install ${missingModule}\n`
        + `or\n`
        + `yarn add ${missingModule}\n`
        + `or\n`
        + `pnpm add ${missingModule}`,
      )
    }
    console.error(
      `Error:\n transform-to-unocss(lessCompiler) ${error.toString()}`,
    )
  }
}
