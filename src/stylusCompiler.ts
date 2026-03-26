import path from 'node:path'
import process from 'node:process'

export async function stylusCompiler(
  css: string,
  filepath: string,
  globalCss?: string,
  debug?: boolean,
  resolveAlias?: any,
) {
  if (typeof window !== 'undefined')
    throw new Error('Stylus is not supported in this browser')

  if (debug) {
    console.log(
      `[transform-to-tailwindcss] Compiling Stylus file: ${filepath || 'unknown file'}`,
    )
  }

  let result = globalCss ? `${globalCss}\n${css}` : css

  // Pre-replace alias imports like @import '@/foo' using resolveAlias map if provided
  if (resolveAlias) {
    try {
      const importRegex = /@import\s+['"](~?@\/[\w\-./]+)['"]/g
      result = result.replace(importRegex, (m, imp) => {
        const rel = imp.replace(/^~?@\//, '')
        // try array/object alias
        if (Array.isArray(resolveAlias)) {
          for (const a of resolveAlias) {
            if (typeof a.find === 'string' && imp.startsWith(a.find)) {
              const resolved = path.isAbsolute(a.replacement)
                ? path.join(a.replacement, imp.slice(a.find.length))
                : path.join(
                    process.cwd(),
                    a.replacement,
                    imp.slice(a.find.length),
                  )
              return `@import '${resolved.replace(/\\/g, '/')}'`
            }
          }
        }
        else if (typeof resolveAlias === 'object') {
          for (const k of Object.keys(resolveAlias)) {
            if (imp.startsWith(k)) {
              const val = resolveAlias[k]
              const resolved = path.isAbsolute(val)
                ? path.join(val, imp.slice(k.length))
                : path.join(process.cwd(), val, imp.slice(k.length))
              return `@import '${resolved.replace(/\\/g, '/')}'`
            }
          }
        }
        // fallback to src
        return `@import '${path.resolve(process.cwd(), 'src', rel).replace(/\\/g, '/')}'`
      })
    }
    catch (e) {
      if (debug)
        console.warn('[transform-to-unocss] stylus alias replace failed', e)
    }
  }

  try {
    // 使用用户项目中的 stylus 版本（通过 peerDependencies）
    const stylus = await import('stylus')

    // collect include paths from resolveAlias
    const includePaths: string[] = []
    try {
      if (resolveAlias) {
        if (Array.isArray(resolveAlias)) {
          for (const a of resolveAlias) {
            if (a && a.replacement) {
              includePaths.push(
                path.isAbsolute(a.replacement)
                  ? a.replacement
                  : path.resolve(process.cwd(), a.replacement),
              )
            }
          }
        }
        else if (typeof resolveAlias === 'object') {
          for (const k of Object.keys(resolveAlias)) {
            const v = resolveAlias[k]
            includePaths.push(
              path.isAbsolute(v) ? v : path.resolve(process.cwd(), v),
            )
          }
        }
      }
    }
    catch (e) {
      if (debug) {
        console.warn(
          '[transform-to-unocss] stylus resolveAlias normalize failed',
          e,
        )
      }
    }

    result = stylus.default.render(result, {
      filename: filepath,
      paths: includePaths.length ? includePaths : undefined,
    })
    return result
  }
  catch (error: any) {
    if (
      error.code === 'MODULE_NOT_FOUND'
      || error.message.includes('Cannot resolve module')
    ) {
      throw new Error(
        `Stylus compiler not found. Please install stylus in your project:\n`
        + `npm install stylus\n`
        + `or\n`
        + `yarn add stylus\n`
        + `or\n`
        + `pnpm add stylus`,
      )
    }
    console.error(
      `Error:\n transform-to-unocss(stylusCompiler) ${error.toString()}`,
    )
  }
}
