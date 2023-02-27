import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('color', () => {
  it('color:red', () => {
    expect(transformToUnocss('color: red')).toBe('text-red')
  })

  it('color:hex', () => {
    expect(transformToUnocss('color: #ffffff')).toBe('text-#ffffff')
  })
  // size
  it('color:rgb', () => {
    expect(transformToUnocss('color:rgb(255, 255, 255)')).toBe(
      'text=[rgb(255,255,255)]',
    )
  })

  it('color:rgba', () => {
    expect(transformToUnocss('color:rgba(255, 255, 255,0.1)')).toBe(
      'text=[rgba(255,255,255,0.1)]',
    )
  })
})
