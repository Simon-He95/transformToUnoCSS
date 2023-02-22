import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('font-size', () => {
  it('rem', () => {
    expect(transformToUnocss('font-size: 1.5rem')).toBe('text-1.5rem')
  })
  it('em', () => {
    expect(transformToUnocss('font-size: 1.25em')).toBe('text-1.25em')
  })
  it('px', () => {
    expect(transformToUnocss('font-size: 10px')).toBe('text-10px')
  })
})
