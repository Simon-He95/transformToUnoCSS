import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('top', () => {
  it('rem;', () => {
    expect(transformToUnocss('top: 0.25rem;')).toBe('top-0.25rem')
  })

  it('px', () => {
    expect(transformToUnocss('top: 20px;')).toBe('top-20px')
  })
  it('em', () => {
    expect(transformToUnocss('top: 20em;')).toBe('top-20em')
  })

  it('calc', () => {
    expect(transformToUnocss('top: calc(100% - 20px);')).toBe(
      'top="[calc(100%-20px)]"',
    )
  })
})
