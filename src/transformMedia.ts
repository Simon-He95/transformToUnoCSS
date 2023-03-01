import { parse } from 'vue/compiler-sfc'
import { transformCss } from './transformCss'
import { getLastName } from './utils'

const mediaReg
  = /@media([\s\w]*)\(([\w-]+):\s*(\w+)\)\s*{([\s\n\w.\{\}\-:;]*)}/g
const emptyMediaReg = /@media([\s\w]*)\(([\w-]+):\s*(\w+)\)\s*{[\s\n]*}/g
const valMap: any = {
  '640px': 'sm',
  '768px': 'md',
  '1024px': 'lg',
  '1280px': 'xl',
  '1536px': '2xl',
}

export function transformMedia(
  code: string,
  stack: any,
  transformFn: (source: string) => string,
): [string, (r: string) => string] {
  let result = code
  const transferBackMap: any = []
  code.replace(
    mediaReg,
    (all: any, pre: any, key: any, val: any, inner: any) => {
      const tempFlag = `/* __transformMedia${Math.random()}__ */`

      const value = valMap[val]

      if (!value) {
        result = result.replace(all, tempFlag)
        transferBackMap.push((r: string) => r.replace(tempFlag, all))
        return result
      }

      if (pre.trim()) {
        const transfer = transformCss(
          inner,
          result,
          stack,
          transformFn,
          `max-${value}`,
        )
        if (transfer !== result) {
          result = transfer.replace(emptyMediaReg, '')
          transferBackMap.push((r: string) => r.replace(tempFlag, transfer))
          return result
        }
        result = result.replace(all, tempFlag)
        transferBackMap.push((r: string) => r.replace(tempFlag, all))
        return result
      }
      let mapValue: string = value
      if (key === 'prefers-reduced-motion') {
        mapValue = `${getLastName(key)}-${
          val === 'no-preference' ? 'safe' : val
        }`
      }

      const transfer = transformCss(
        inner,
        result,
        stack,
        transformFn,
        mapValue,
      ).replace(emptyMediaReg, '')
      result = transfer.replace(all, tempFlag)
      // update stack
      stack = parse(result)!.descriptor!.template!.ast
      transferBackMap.push((r: string) => r.replace(tempFlag, all))
      return result
    },
  )

  return [
    result,
    (r: string) =>
      transferBackMap.reduce(
        (result: string, fn: (r: string) => string) => fn(result),
        r,
      ),
  ]
}
