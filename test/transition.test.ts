import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('transition', () => {
  it('transition: none;', () => {
    expect(transformToUnocss('transition: none;')).toBe('transition-none')
  })

  it('transition: none;', () => {
    expect(transformToUnocss('transition: none;')).toBe('transition-none')
  })
  it('transition-property: all;', () => {
    expect(transformToUnocss('transition-property: all;')).toBe('transition-all')
  })

  it('transition-property: box-shadow;', () => {
    expect(transformToUnocss('transition-property: box-shadow;')).toBe('transition-shadow')
  })

  it('transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;', () => {
    expect(transformToUnocss('transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;')).toBe('transition-colors')
  })

  it('transition-duration: 75ms;', () => {
    expect(transformToUnocss('transition-duration: 75ms;')).toBe('duration-75')
  })

  it('transition-delay: 75ms;', () => {
    expect(transformToUnocss('transition-delay: 75ms;')).toBe('delay-75')
  })

  it('transition-timing-function: linear', () => {
    expect(transformToUnocss('transition-timing-function: linear')).toBe('ease-linear')
  })

  it('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);', () => {
    expect(transformToUnocss('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);')).toBe('ease-[cubic-bezier(0.4,0,1,1)]')
  })
})
