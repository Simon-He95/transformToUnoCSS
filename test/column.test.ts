import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('column', () => {
  it('columns: 1;', () => {
    expect(transformToUnocss('columns: 1;')).toBe('columns-1')
  })

  it('columns: auto;', () => {
    expect(transformToUnocss('columns: auto;')).toBe('columns-auto')
  })

  it('columns: 20rem;', () => {
    expect(transformToUnocss('columns: 20rem;')).toBe('columns-20rem')
  })

  it('column-gap: 0px;', () => {
    expect(transformToUnocss('column-gap: 0px;')).toBe('gap-x-0px')
  })
})
