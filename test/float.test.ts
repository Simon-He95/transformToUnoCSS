import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('float', () => {
  it('float-left', () => {
    expect(toUnocss('float:left')).toBe('float-left')
  })

  it('float-none', () => {
    expect(toUnocss('float:none')).toBe('float-none')
  })
})
