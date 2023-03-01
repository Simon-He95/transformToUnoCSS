import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('border', () => {
  it('red;', () => {
    expect(transformToUnocss('border-color:red;')).toBe('border-red')
  })

  it('radius', () => {
    expect(transformToUnocss('border-radius: 0.25rem;')).toBe(
      'border-rd-0.25rem',
    )
  })

  it('border-width', () => {
    expect(transformToUnocss('border-width: 2px;')).toBe('border-2px')
  })

  it('radius-calc', () => {
    expect(transformToUnocss('border-radius: calc(100% - 20px)')).toBe(
      'border-rd="[calc(100%-20px)]"',
    )
  })

  it('style', () => {
    expect(transformToUnocss('border-style: inset;')).toBe('border-inset')
  })

  it('collapse', () => {
    expect(transformToUnocss('border-collapse: collapse;')).toBe(
      'border-collapse',
    )
  })

  it('spacing', () => {
    expect(transformToUnocss('border-spacing: 0px 0px;')).toBe(
      'border-spacing="[0px_0px]"',
    )
  })
})
