import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('align', () => {
  it('gap: 0px;', () => {
    expect(transformToUnocss('gap: 0px;')).toBe('gap-0px')
  })

  it('column-gap: 0px;', () => {
    expect(transformToUnocss('column-gap: 0px;')).toBe('gap-x-0px')
  })

  it('gap: 0.125rem;', () => {
    expect(transformToUnocss('gap: 0.125rem;')).toBe('gap-0.125rem')
  })

  it('row-gap: 0.125rem;', () => {
    expect(transformToUnocss('row-gap: 0.125rem;')).toBe('gap-y-0.125rem')
  })
})
