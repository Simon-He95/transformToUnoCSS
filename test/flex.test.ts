import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('flex', () => {
  it('flex: none;', () => {
    expect(toUnocss('flex: none;')).toBe('flex-none')
  })

  it('flex-direction: column-reverse;', () => {
    expect(toUnocss('flex-direction: column-reverse;')).toBe('flex-col-reverse')
  })

  it('flex-direction: column;', () => {
    expect(toUnocss('flex-direction: column;')).toBe('flex-col')
  })

  it('flex-direction: column-reverse;', () => {
    expect(toUnocss('flex-direction: column-reverse;')).toBe('flex-col-reverse')
  })

  it('flex-grow: 1;', () => {
    expect(toUnocss('flex-grow: 1;')).toBe('grow-1')
  })

  it('flex-grow: 1;', () => {
    expect(toUnocss('flex: 1;')).toBe('flex-1')
  })

  it('flex-shrink: 1;', () => {
    expect(toUnocss('flex-shrink: 1;')).toBe('shrink-1')
  })

  it('flex-basis: 0px;', () => {
    expect(toUnocss('flex-basis: 0px;')).toBe('basis-0px')
  })

  it('flex-direction: row-reverse;', () => {
    expect(toUnocss('flex-direction: row-reverse;')).toBe(
      'flex-row-reverse',
    )
  })

  it('flex-wrap: wrap-reverse;', () => {
    expect(toUnocss('flex-wrap: wrap-reverse;')).toBe(
      'flex-wrap-reverse',
    )
  })

  it('flex: 1 1 0%;', () => {
    expect(toUnocss('flex: 1 1 0%;')).toBe('flex="[1_1_0%]"')
  })

  it('flex: 1 1 auto;', () => {
    expect(toUnocss('flex: 1 1 auto;')).toBe('flex="[1_1_auto]"')
  })
})
