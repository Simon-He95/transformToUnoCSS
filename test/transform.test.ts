import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('transform', () => {
  it('transform-origin:center', () => {
    expect(toUnocss('transform-origin: center;')).toBe('origin-center')
  })

  it('transform-origin: top right;', () => {
    expect(toUnocss('transform-origin: top right;')).toBe(
      'origin-top-right',
    )
  })

  it('transform: scale(0);', () => {
    expect(toUnocss('transform: scale(.5);')).toBe('scale-50')
  })

  it('transform: scaleX(0);', () => {
    expect(toUnocss('transform: scaleX( 0.5 );')).toBe('scale-x-50')
  })

  it('transform: rotate(0deg);', () => {
    expect(toUnocss('transform: rotate( 0deg );')).toBe('rotate="0"')
  })

  it('transform: translateX(1px);', () => {
    expect(toUnocss('transform: translateX(1px);')).toBe(
      'translate-x="1px"',
    )
  })

  it('transform: translateX(1px);', () => {
    expect(toUnocss('transform: translateX(1px);')).toBe(
      'translate-x="1px"',
    )
  })

  it('transform: translateX(10%);', () => {
    expect(toUnocss('transform: translateX(10%);')).toBe(
      'translate-x="10%"',
    )
  })
  it('transform: ranslate(10%, 20%);', () => {
    expect(toUnocss('transform: translate(10%, 20%);')).toBe(
      'translate="10% 20%"',
    )
  })

  it('transform: skewX(2deg);', () => {
    expect(toUnocss('transform: skewX(2deg);')).toBe('skew-x="2"')
  })

  it('transform: skew(50deg)', () => {
    expect(toUnocss('transform: skew(50deg);')).toBe('skew="50"')
  })

  it('transform: scale(0.6)', () => {
    expect(toUnocss('transform: scale(0.6);')).toBe('scale-60')
  })
  it('transform: translate(-26px, 16px) skew(50deg) scaleY(0.6);', () => {
    expect(toUnocss('transform: translate(-26px, 16px) skew(50deg) scaleY(0.6)')).toBe('translate="-26px 16px" skew="50" scale-y-60')
  })

})
