import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('line-height', () => {
  it('rem;', () => {
    expect(transformToUnocss('line-height: 0.25rem;')).toBe('lh-0.25rem')
  })

  it('px', () => {
    expect(transformToUnocss('line-height: 20px;')).toBe('lh-20px')
  })
  it('em', () => {
    expect(transformToUnocss('line-height: 20em;')).toBe('lh-20em')
  })

  it('calc', () => {
    expect(transformToUnocss('line-height: calc(100% - 20px);')).toBe(
      'lh-[calc(100%-20px)]',
    )
  })
})
