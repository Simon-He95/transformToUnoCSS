import { getFirstName } from './utils'
import { size } from './size'
import { background } from './background'
import { max } from './max'
import { font } from './font'
import { cursor } from './cursor'
import { transformMargin } from './margin'
import { opacity } from './opacity'
import { color } from './color'
import { text } from './text'
import { vertical } from './vertical'
import { line } from './line'
import { border } from './border'
import { display } from './display'
import { float } from './float'
import { top } from './top'
import { list } from './list'
import { box } from './box'
import { filter } from './filter'
import { backdrop } from './backdrop'
import { transform } from './transform'
import { transition } from './transition'
import { justify } from './justify'
import { align } from './align'
import { flex } from './flex'
import { aspect } from './aspect'
import { column } from './column'
import { isolation } from './isolation'
import { object } from './object'
import { overscroll } from './overscroll'
import { grid } from './grid'
import { row } from './row'
import { place } from './place'
import { letter } from './letter'
import { white } from './white'
import { word } from './word'
import { outline } from './outline'
import { mix } from './mix'
import { resize } from './resize'
import { scroll } from './scroll'
import { user } from './user'
import { will } from './will'
import { animation } from './animation'
import { content } from './content'
import { empty } from './empty'
import { writing } from './writing'
import { inset } from './inset'

const typeMap: any = {
  animation,
  aspect,
  backface: list,
  caption: list,
  column,
  columns: float,
  break: float,
  empty,
  box,
  writing,
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
  flex,
  order: float,
  grid,
  gap: top,
  justify,
  align,
  place,
  padding: transformMargin,
  perspective: float,
  margin: transformMargin,
  width: size,
  min: max,
  max,
  height: size,
  font,
  letter,
  line,
  list,
  text,
  vertical,
  white,
  word,
  content,
  background,
  border,
  outline,
  opacity,
  mix,
  filter,
  backdrop,
  table: list,
  transition,
  transform,
  accent: list,
  appearance: list,
  cursor,
  caret: list,
  pointer: float,
  resize,
  scroll,
  inset,
  touch: list,
  user,
  will,
  fill: float,
  stroke: list,
  color,
  row,
}
const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/

export function toUnocss(css: String, isRem = false) {
  const match = css.match(splitReg)
  if (!match)
    return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, key, val] = match
  const first = getFirstName(key)
  const result = typeMap[first]?.(key, val)
  if (result && isRem) {
    return result.replace(
      /-([0-9\.]+)px/,
      (_: string, v: string) => `-${+v / 4}`,
    )
  }

  return result
}
