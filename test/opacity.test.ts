import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('opacity', () => {
  it('opacity: 0.5', () => {
    expect(toUnocss('opacity: 0.5')).toBe('op-50')
  })

  it('opacity: 0', () => {
    expect(toUnocss('opacity: 0')).toBe('op-0')
  })

  it('opacity: 1', () => {
    expect(toUnocss('opacity: 1')).toBe('op-100')
  })

  it('opacity: 50%', () => {
    expect(toUnocss('opacity: 50%')).toBe('op-50')
  })

  it('opacity: 100%', () => {
    expect(toUnocss('opacity: 100%')).toBe('op-100')
  })

  it('opacity: 0%', () => {
    expect(toUnocss('opacity: 0%')).toBe('op-0')
  })
})
