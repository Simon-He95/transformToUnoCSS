import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('backdrop-filter', () => {
  it('blur 0', () => {
    expect(transformToUnocss('backdrop-filter: blur(0);')).toBe('backdrop-blur-0')
  })

  it('blur px', () => {
    expect(transformToUnocss('backdrop-filter: blur(10px);')).toBe('backdrop-blur-10px')
  })

  it('brightness', () => {
    expect(transformToUnocss('backdrop-filter: brightness(.5);')).toBe('backdrop-brightness-50')
  })

  it('contrast', () => {
    expect(transformToUnocss('backdrop-filter: contrast(.5);')).toBe('backdrop-contrast-50')
  })

  it('grayscale 0.1', () => {
    expect(transformToUnocss('backdrop-filter: grayscale(0.1);')).toBe('backdrop-grayscale-10')
  })

  it('grayscale %', () => {
    expect(transformToUnocss('backdrop-filter: grayscale(10%);')).toBe('backdrop-grayscale-10')
  })
  it('hue', () => {
    expect(transformToUnocss('backdrop-filter: hue-rotate(0deg);')).toBe('backdrop-hue-rotate-0')
  })
  it('invert', () => {
    expect(transformToUnocss('backdrop-filter: invert(0.1);')).toBe('backdrop-invert-10')
  })

  it('opacity', () => {
    expect(transformToUnocss('backdrop-filter: opacity(0);')).toBe('backdrop-opacity-0')
  })

  it('saturate', () => {
    expect(transformToUnocss('backdrop-filter: saturate(0);')).toBe('backdrop-saturate-0')
  })

  it('sepia', () => {
    expect(transformToUnocss('backdrop-filter: sepia(0);')).toBe('backdrop-sepia-0')
  })
})
