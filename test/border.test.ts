import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('border', () => {
  it('red;', () => {
    expect(toUnocss('border-color:red;')).toBe('border-red')
  })

  it('radius', () => {
    expect(toUnocss('border-radius: 0.25rem;')).toBe(
      'border-rd-0.25rem',
    )
  })

  it('border-width', () => {
    expect(toUnocss('border-width: 2px;')).toBe('border-2px')
  })

  it('radius-calc', () => {
    expect(toUnocss('border-radius: calc(100% - 20px)')).toBe(
      'border-rd="[calc(100%-20px)]"',
    )
  })

  it('style', () => {
    expect(toUnocss('border-style: inset;')).toBe('border-inset')
  })

  it('collapse', () => {
    expect(toUnocss('border-collapse: collapse;')).toBe(
      'border-collapse',
    )
  })

  it('spacing', () => {
    expect(toUnocss('border-spacing: 0px 0px;')).toBe(
      'border-spacing="[0px_0px]"',
    )
  })
})
