import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('letter', () => {
  it('px', () => {
    expect(toUnocss('letter-spacing: -5px;')).toBe('tracking--5px')
  })
  it('em', () => {
    expect(toUnocss('letter-spacing: -5em;')).toBe('tracking--5em')
  })
  it('rem', () => {
    expect(toUnocss('width:10rem')).toMatchInlineSnapshot('"w-10rem"')
  })
  it('max-content', () => {
    expect(toUnocss('width: max-content')).toMatchInlineSnapshot(
      '"w-max"',
    )
  })
  it('min-content', () => {
    expect(toUnocss('width: min-content')).toMatchInlineSnapshot(
      '"w-min"',
    )
  })
  it('fit-content', () => {
    expect(toUnocss('width:fit-content')).toBe('w-fit')
  })
  it('auto', () => {
    expect(toUnocss('width:auto')).toBe('w-auto')
  })
  it('calc', () => {
    expect(toUnocss('width:calc(100% - 50px)')).toBe(
      'w="[calc(100%-50px)]"',
    )
  })
  it('calc not space', () => {
    expect(toUnocss('width:calc(100%-50px)')).toBe(
      'w="[calc(100%-50px)]"',
    )
  })

  it('calc space', () => {
    expect(toUnocss('width:calc(100%  -  50px)')).toBe(
      'w="[calc(100%-50px)]"',
    )
  })

  it('min-width: 0px;', () => {
    expect(toUnocss('min-width: 0px;')).toBe('min-w-0px')
  })

  it('min-width: 0px;', () => {
    expect(toUnocss('min-width: 100%;;')).toBe('min-w="[100%]"')
  })
  it('max-width: 0px;', () => {
    expect(toUnocss('max-width: 0px;')).toBe('max-w-0px')
  })
  it('max-width: 0px;', () => {
    expect(toUnocss('max-width: max-content;')).toBe('max-w-max')
  })
})
