import { getLastName } from 'transform-to-unocss-core'
import { transformCss } from './transformCss'

const mediaReg = /@media([\s\w]*)\(([\w-]+):\s*(\w+)\)\s*\{([\s\w.{}\-:;]*)\}/g

const mediaSingleReg
  = /@media([\s\w]*)\(([\w-]+):\s*(\w+)\)\s*\{([\s\w.{}\-:;]*)\}/
const emptyMediaReg = /@media([\s\w]*)\(([\w-]+):\s*(\w+)\)\s*\{\s*\}/g
const valMap: any = {
  '640px': 'sm',
  '768px': 'md',
  '1024px': 'lg',
  '1280px': 'xl',
  '1536px': '2xl',
}

/**
 * Transforms CSS @media queries to UnoCSS responsive utilities
 * @param code - The code containing @media queries
 * @param isJsx - Whether the code is JSX/TSX format
 * @param isRem - Whether to convert px values to rem
 * @param filepath - The file path for resolving CSS imports within media queries
 * @param debug - Whether to enable debug logging
 * @param globalCss - Global CSS configuration for preprocessors
 * @returns A tuple of [transformed code, restore function]
 */
export async function transformMedia(
  code: string,
  isJsx?: boolean,
  isRem?: boolean,
  filepath?: string,
  debug = false,
  globalCss?: any,
): Promise<[string, (r: string) => string]> {
  const transferBackMap: any = []
  let result = code

  const matcher = code.match(mediaReg)
  if (!matcher) {
    if (debug) {
      console.log('[DEBUG] transformMedia: No @media queries found')
    }
    return returnValue(result)
  }

  if (debug) {
    console.log(
      '[DEBUG] transformMedia started:',
      JSON.stringify(
        {
          filepath,
          isJsx,
          isRem,
          mediaQueriesCount: matcher.length,
        },
        null,
        2,
      ),
    )
  }

  for await (const item of matcher) {
    const [all, pre, key, val, inner] = item.match(mediaSingleReg)!
    const tempFlag = `/* __transformMedia${Math.random()}__ */`

    const value = valMap[val]

    if (debug) {
      console.log(
        '[DEBUG] transformMedia processing query:',
        JSON.stringify(
          {
            all: `${all.substring(0, 100)}...`,
            key,
            val,
            mappedValue: value,
            hasPrefix: !!pre.trim(),
          },
          null,
          2,
        ),
      )
    }

    if (!value) {
      result = result.replace(all, tempFlag)
      transferBackMap.push((r: string) => r.replace(tempFlag, all))

      continue
    }

    if (pre.trim()) {
      const transfer = await transformCss(
        inner,
        result,
        `max-${value}`,
        isJsx,
        filepath,
        isRem,
        debug,
        globalCss,
      )

      if (transfer !== result) {
        result = transfer.replace(emptyMediaReg, '')
        transferBackMap.push((r: string) => r.replace(tempFlag, transfer))

        continue
      }
      result = result.replace(all, tempFlag)
      transferBackMap.push((r: string) => r.replace(tempFlag, all))

      continue
    }
    let mapValue: string = value
    if (key === 'prefers-reduced-motion')
      mapValue = `${getLastName(key)}-${val === 'no-preference' ? 'safe' : val}`

    const transfer = (
      await transformCss(
        inner,
        result,
        mapValue,
        isJsx,
        filepath,
        isRem,
        debug,
        globalCss,
      )
    ).replace(emptyMediaReg, '')
    result = transfer.replace(all, tempFlag)
    transferBackMap.push((r: string) => r.replace(tempFlag, all))
  }

  return returnValue(result)

  function returnValue(result: string): [string, (r: string) => string] {
    return [
      result,
      (r: string) =>
        transferBackMap.reduce(
          (result: string, fn: (r: string) => string) => fn(result),
          r,
        ),
    ]
  }
}
