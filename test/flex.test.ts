import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('flex', () => {
  it('flex: none;', () => {
    expect(transformToUnocss('flex: none;')).toBe('flex-none')
  })

  it('flex-grow: 1;', () => {
    expect(transformToUnocss('flex-grow: 1;')).toBe('grow-1')
  })

  it('flex-shrink: 1;', () => {
    expect(transformToUnocss('flex-shrink: 1;')).toBe('shrink-1')
  })

  it('flex-basis: 0px;', () => {
    expect(transformToUnocss('flex-basis: 0px;')).toBe('basis-0px')
  })

  it('flex-direction: row-reverse;', () => {
    expect(transformToUnocss('flex-direction: row-reverse;')).toBe(
      'flex-row-reverse',
    )
  })

  it('flex-wrap: wrap-reverse;', () => {
    expect(transformToUnocss('flex-wrap: wrap-reverse;')).toBe(
      'flex-wrap-reverse',
    )
  })

  it('flex: 1 1 0%;', () => {
    expect(transformToUnocss('flex: 1 1 0%;')).toBe('flex-[1_1_0%]')
  })

  it('flex: 1 1 auto;', () => {
    expect(transformToUnocss('flex: 1 1 auto;')).toBe('flex-[1_1_auto]')
  })
})
