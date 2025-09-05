import type { Options } from './type'
import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'
import { transformCode } from './transformCode'

const unplugin = createUnplugin((options?: Options): any => {
  // 默认排除 node_modules，用户可以通过 exclude 选项覆盖
  const defaultExclude = ['**/node_modules/**']
  const userExclude = options?.exclude
    ? Array.isArray(options.exclude)
      ? options.exclude
      : [options.exclude]
    : []
  const finalExclude = [...defaultExclude, ...userExclude]

  const filter = createFilter(options?.include, finalExclude)
  let globalCss: any = null
  // store resolve.alias from Vite/Rollup config so we can pass it down to compilers
  let resolveAlias: any = null
  return [
    {
      name: 'unplugin-transform-to-unocss',
      enforce: 'pre',
      async configResolved(config: any) {
        globalCss = config.css?.preprocessorOptions
        resolveAlias = config.resolve?.alias ?? null
      },
      transformInclude(id: string) {
        // 额外的安全检查：确保不处理 node_modules 中的文件
        if (id.includes('node_modules')) {
          return false
        }
        return filter(id)
      },
      async transform(code: string, id: string) {
        let suffix!: 'vue' | 'tsx'
        if (id.endsWith('.vue')) {
          suffix = 'vue'
        }
        else if (id.endsWith('lang.tsx')) {
          // skip
        }
        else if (id.endsWith('.tsx')) {
          suffix = 'tsx'
        }

        if (!suffix)
          return code

        // Attempt to use bundler resolver (this.resolve) to rewrite style imports
        // so they match Vite/Rollup resolution (this is the most accurate method).
        let transformedCode = code
        try {
          // only handle .vue single-file components here
          if (suffix === 'vue' && typeof this.resolve === 'function') {
            const styleBlockRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/g
            const blocks: {
              full: string
              content: string
              start: number
              end: number
            }[] = []
            for (const m of code.matchAll(styleBlockRegex)) {
              if (!m.index)
                continue
              blocks.push({
                full: m[0],
                content: m[1],
                start: m.index,
                end: m.index + m[0].length,
              })
            }

            if (blocks.length) {
              const replacements: {
                start: number
                end: number
                text: string
              }[] = []
              for (const b of blocks) {
                const content = b.content
                // find @import/@use/@forward inside style content
                const impRegex
                  = /@(import|use|forward)\s+(?:url\()?['"]([^'"]+)['"]\)?/g
                const matches: {
                  index: number
                  length: number
                  path: string
                }[] = []
                for (const im of content.matchAll(impRegex)) {
                  if (typeof im.index !== 'number')
                    continue
                  matches.push({
                    index: im.index,
                    length: im[0].length,
                    path: im[2],
                  })
                }

                if (!matches.length)
                  continue

                // resolve each path sequentially (could be parallel but keep simple)
                let newContent = ''
                let lastIndex = 0
                for (const m of matches) {
                  const original = content.slice(m.index, m.index + m.length)
                  const before = content.slice(lastIndex, m.index)
                  lastIndex = m.index + m.length

                  let resolvedId: string | null = null
                  try {
                    const r = await this.resolve(m.path, id)
                    if (r && r.id && !r.id.startsWith('\u0000'))
                      resolvedId = r.id
                  }
                  catch (e) {
                    // ignore
                  }

                  if (resolvedId) {
                    // replace the import path inside the original import statement
                    const replaced = original.replace(m.path, resolvedId)
                    newContent += before + replaced
                  }
                  else {
                    newContent += before + original
                  }
                }
                newContent += content.slice(lastIndex)

                // construct full <style> block replacement text
                const newFull = b.full.replace(b.content, newContent)
                replacements.push({ start: b.start, end: b.end, text: newFull })
              }

              // apply replacements from end to start to keep indexes valid
              transformedCode = code
              for (let i = replacements.length - 1; i >= 0; i--) {
                const r = replacements[i]
                transformedCode
                  = transformedCode.slice(0, r.start)
                    + r.text
                    + transformedCode.slice(r.end)
              }
            }
          }
        }
        catch (e) {
          // resolver failed - fall back to existing behavior
          if (globalCss && globalCss.debug)
            console.warn('[transform-to-unocss] resolver error', e)
        }

        return await transformCode(transformedCode, {
          filepath: id,
          type: suffix,
          globalCss,
          resolveAlias,
        })
      },
    },
  ]
})

export const viteTransformToUnocss = unplugin.vite
export const rollupTransformToUnocss = unplugin.rollup
export const webpackTransformToUnocss = unplugin.webpack
export const esbuildTransformToUnocss = unplugin.esbuild
export const rspackTransformToUnocss = unplugin.rspack
export const farmTransformToUnocss = unplugin.farm
export const rolldownTransformToUnocss = unplugin.rolldown
