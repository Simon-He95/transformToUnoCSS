import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('align', () => {
  it('gap: 0px;', () => {
    expect(toUnocss('gap: 0px;')).toBe('gap-0px')
  })

  it('column-gap: 0px;', () => {
    expect(toUnocss('column-gap: 0px;')).toBe('gap-x-0px')
  })

  it('gap: 0.125rem;', () => {
    expect(toUnocss('gap: 0.125rem;')).toBe('gap-0.125rem')
  })

  it('row-gap: 0.125rem;', () => {
    expect(toUnocss('row-gap: 0.125rem;')).toBe('gap-y-0.125rem')
  })
})
