import { getFirstName } from './utils'
import { transformSize } from './size'
import { transformBackground } from './background'
import { transformMax } from './max'
import { transformFont } from './font'
import { transformCursor } from './cursor'
import { transformMargin } from './margin'
import { transformOpacity } from './opacity'
import { transformPosition } from './position'
import { transformColor } from './color'
import { transformText } from './text'
import { transformVertical } from './transformVertical'
import { transformLine } from './line'

const typeMap: any = {
  background: transformBackground,
  width: transformSize,
  height: transformSize,
  font: transformFont,
  max: transformMax,
  cursor: transformCursor,
  margin: transformMargin,
  padding: transformMargin,
  opacity: transformOpacity,
  position: transformPosition,
  color: transformColor,
  text: transformText,
  vertical: transformVertical,
  line: transformLine,
}
export function transformToUnocss(css: String) {
  const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#]+)/
  const match = css.match(splitReg)
  if (!match)
    return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, key, val] = match
  const first = getFirstName(key)
  const result = typeMap[first](key, val)
  return result
}

