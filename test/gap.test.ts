import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('align', () => {
  it('gap: 0px;', () => {
    expect(transformToUnocss('gap: 0px;')).toBe('gap-0px')
  })

  it('column-gap: 0px;', () => {
    expect(transformToUnocss('column-gap: 0px;')).toBe('gap-x-0px')
  })
})
