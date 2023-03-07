import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('height', () => {
  it('px', () => {
    expect(toUnocss('height:10px')).toMatchInlineSnapshot('"h-10px"')
  })
  it('em', () => {
    expect(toUnocss('height:10em')).toMatchInlineSnapshot('"h-10em"')
  })
  it('rem', () => {
    expect(toUnocss('height:10rem')).toMatchInlineSnapshot('"h-10rem"')
  })
  it('max-content', () => {
    expect(toUnocss('height: max-content')).toMatchInlineSnapshot(
      '"h-max"',
    )
  })
  it('min-content', () => {
    expect(toUnocss('height: min-content')).toMatchInlineSnapshot(
      '"h-min"',
    )
  })
  it('fit-content', () => {
    expect(toUnocss(' height:fit-content')).toBe('h-fit')
  })
  it('auto', () => {
    expect(toUnocss(' height:auto')).toBe('h-auto')
  })
  it('calc', () => {
    expect(toUnocss(' height:calc(100% - 50px)')).toBe(
      'h="[calc(100%-50px)]"',
    )
  })
  it('calc not space', () => {
    expect(toUnocss(' height:calc(100%-50px)')).toBe(
      'h="[calc(100%-50px)]"',
    )
  })

  it('calc space', () => {
    expect(toUnocss(' height:calc(100%  -  50px)')).toBe(
      'h="[calc(100%-50px)]"',
    )
  })

  it('min-height: 0px;', () => {
    expect(toUnocss('min-height: 0px;')).toBe('min-h-0px')
  })

  it('min-height: 0px;', () => {
    expect(toUnocss('min-height: 100%;;')).toBe('min-h="[100%]"')
  })
  it('max-height: 0px;', () => {
    expect(toUnocss('max-height: 0px;')).toBe('max-h-0px')
  })
  it('max-height: 0px;', () => {
    expect(toUnocss('max-height: max-content;')).toBe('max-h-max')
  })
})
