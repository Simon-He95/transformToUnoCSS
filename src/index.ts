import { getFirstName } from './utils'
import { size } from './size'
import { transformBackground } from './background'
import { transformMax } from './max'
import { transformFont } from './font'
import { transformCursor } from './cursor'
import { transformMargin } from './margin'
import { transformOpacity } from './opacity'
import { transformColor } from './color'
import { transformText } from './text'
import { transformVertical } from './transformVertical'
import { transformLine } from './line'
import { transformBorder } from './border'
import { display } from './display'
import { float } from './float'
import { top } from './top'
import { transformList } from './list'
import { box } from './box'
import { transformFilter } from './filter'
import { transformBackdrop } from './backdrop'
import { transform } from './transform'
import { transformTransition } from './transition'
import { transformJustify } from './justify'
import { transformAlign } from './align'
import { transformFlex } from './flex'
import { aspect } from './aspect'
import { column } from './column'
import { isolation } from './isolation'
import { object } from './object'
import { overscroll } from './overscroll'

const typeMap: any = {
  aspect,
  column,
  columns: float,
  break: float,
  box,
  display,
  float,
  clear: float,
  isolation,
  object,
  overflow: float,
  overscroll,
  position: display,
  top,
  left: top,
  right: top,
  bottom: top,
  visibility: display,
  z: size,
  background: transformBackground,
  width: size,
  height: size,
  font: transformFont,
  max: transformMax,
  cursor: transformCursor,
  margin: transformMargin,
  padding: transformMargin,
  opacity: transformOpacity,
  color: transformColor,
  text: transformText,
  vertical: transformVertical,
  line: transformLine,
  border: transformBorder,
  list: transformList,
  filter: transformFilter,
  backdrop: transformBackdrop,
  transform,
  transition: transformTransition,
  justify: transformJustify,
  align: transformAlign,
  gap: top,
  flex: transformFlex,
}
export function transformToUnocss(css: String) {
  const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/]+)/
  const match = css.match(splitReg)
  if (!match)
    return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, key, val] = match
  const first = getFirstName(key)
  const result = typeMap[first](key, val)
  return result
}

