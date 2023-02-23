import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('caret', () => {
  it('caret-color: inherit;', () => {
    expect(transformToUnocss('caret-color: inherit;')).toBe('caret-inherit')
  })

  it('caret-color: #fff;', () => {
    expect(transformToUnocss('caret-color: #fff;')).toBe('caret-#fff')
  })
})
