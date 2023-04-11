import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('box-shadow', () => {
  it('box-decoration-break: clone;', () => {
    expect(toUnocss('box-decoration-break: clone;')).toBe(
      'box-decoration-clone',
    )
  })

  it('box-sizing: border-box;', () => {
    expect(toUnocss('box-sizing: border-box  !important;')).toBe(
      'box-border!',
    )
  })

  it('box-shadow red', () => {
    expect(
      toUnocss('box-shadow: 10px 20px 10px 10px red  !important;'),
    ).toBe('shadow="[10px_20px_10px_10px_red]!"')
  })

  it('box-shadow rgb', () => {
    expect(
      toUnocss(
        'box-shadow: 10px 20px 10px 10px rgb(255, 255, 255)  !important;',
      ),
    ).toBe('shadow="[10px_20px_10px_10px_rgb(255,255,255)]!"')
  })

  it('box-shadow rgba', () => {
    expect(
      toUnocss(
        'box-shadow: 10px 20px 10px 10px rgba(255, 255, 255,0.1) !important;',
      ),
    ).toBe('shadow="[10px_20px_10px_10px_rgba(255,255,255,0.1)]!"')
  })

  it('box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);', () => {
    expect(
      toUnocss(
        'box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);',
      ),
    ).toBe('shadow="[1px_1px_2px_rgba(0,0,0,0.2),1px_1px_5px_rgba(0,0,0,0.2)]"')
  })
})
