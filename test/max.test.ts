import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('position', () => {
  it('max-width:50px', () => {
    expect(transformToUnocss('max-width:50px')).toBe('max-w-50px')
  })

  it('max-width:max-content', () => {
    expect(transformToUnocss('max-width:max-content')).toBe('max-w-max')
  })

  it('max-height:50px', () => {
    expect(transformToUnocss('max-height:50px')).toBe('max-h-50px')
  })

  it('max-height:max-content', () => {
    expect(transformToUnocss('max-height:max-content')).toBe('max-h-max')
  })
})
