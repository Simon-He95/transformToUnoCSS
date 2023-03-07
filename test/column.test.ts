import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('column', () => {
  it('columns: 1;', () => {
    expect(toUnocss('columns: 1;')).toBe('columns-1')
  })

  it('columns: auto;', () => {
    expect(toUnocss('columns: auto;')).toBe('columns-auto')
  })

  it('columns: 20rem;', () => {
    expect(toUnocss('columns: 20rem;')).toBe('columns-20rem')
  })

  it('column-gap: 0px;', () => {
    expect(toUnocss('column-gap: 0px;')).toBe('gap-x-0px')
  })
})
