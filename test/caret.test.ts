import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('caret', () => {
  it('caret-color: inherit;', () => {
    expect(toUnocss('caret-color: inherit;')).toBe('caret-inherit')
  })

  it('caret-color: #fff;', () => {
    expect(toUnocss('caret-color: #fff;')).toBe('caret="[#fff]"')
  })
})
