import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('box-shadow', () => {
  it('box-decoration-break: clone;', () => {
    expect(transformToUnocss('box-decoration-break: clone;')).toBe('box-decoration-clone')
  })

  it('box-sizing: border-box;', () => {
    expect(transformToUnocss('box-sizing: border-box;')).toBe('box-border')
  })

  it('box-shadow red', () => {
    expect(transformToUnocss('box-shadow: 10px 20px 10px 10px red;')).toBe('shadow-[10px_20px_10px_10px_red]')
  })

  it('box-shadow rgb', () => {
    expect(transformToUnocss('box-shadow: 10px 20px 10px 10px rgb(255, 255, 255);')).toBe('shadow-[10px_20px_10px_10px_rgb(255,255,255)]')
  })

  it('box-shadow rgba', () => {
    expect(transformToUnocss('box-shadow: 10px 20px 10px 10px rgba(255, 255, 255,0.1);')).toBe('shadow-[10px_20px_10px_10px_rgba(255,255,255,0.1)]')
  })
})
