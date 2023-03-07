import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('position', () => {
  it('max-width:50px', () => {
    expect(toUnocss('max-width:50px')).toBe('max-w-50px')
  })

  it('max-width:max-content', () => {
    expect(toUnocss('max-width:max-content')).toBe('max-w-max')
  })

  it('max-height:50px', () => {
    expect(toUnocss('max-height:50px')).toBe('max-h-50px')
  })

  it('max-height:max-content', () => {
    expect(toUnocss('max-height:max-content')).toBe('max-h-max')
  })
})
