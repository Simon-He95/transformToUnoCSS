import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('color', () => {
  it('color:red', () => {
    expect(toUnocss('color: red')).toBe('text-red')
  })

  it('color:hex', () => {
    expect(toUnocss('color: #ffffff')).toBe('text="[#ffffff]"')
  })
  // size
  it('color:rgb', () => {
    expect(toUnocss('color:rgb(255, 255, 255)')).toBe(
      'text="[rgb(255,255,255)]"',
    )
  })

  it('color:rgba', () => {
    expect(toUnocss('color:rgba(255, 255, 255,0.1)')).toBe(
      'text="[rgba(255,255,255,0.1)]"',
    )
  })
})
