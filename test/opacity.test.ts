import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('opacity', () => {
  it('opacity: 0.5', () => {
    expect(transformToUnocss('opacity: 0.5')).toBe('op-50')
  })

  it('opacity: 0', () => {
    expect(transformToUnocss('opacity: 0')).toBe('op-0')
  })

  it('opacity: 1', () => {
    expect(transformToUnocss('opacity: 1')).toBe('op-100')
  })

  it('opacity: 50%', () => {
    expect(transformToUnocss('opacity: 50%')).toBe('op-50')
  })

  it('opacity: 100%', () => {
    expect(transformToUnocss('opacity: 100%')).toBe('op-100')
  })

  it('opacity: 0%', () => {
    expect(transformToUnocss('opacity: 0%')).toBe('op-0')
  })
})
