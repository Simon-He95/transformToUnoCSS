import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('animation', () => {
  it('animation-delay: 2s;', () => {
    expect(toUnocss('animation-delay:2s;')).toBe('animate-2s')
  })

  it('animation: revert;', () => {
    expect(toUnocss('animation: revert;')).toBe('animate-revert')
  })

  it('animation-play-state: paused;', () => {
    expect(toUnocss('animation-play-state: paused;')).toBe('animate-paused')
  })

  it('animation-direction: reverse;', () => {
    expect(toUnocss(' animation-direction: reverse;')).toBe('animate-reverse')
  })

  it('animation-fill-mode: forwards;', () => {
    expect(toUnocss('animation-fill-mode: forwards;')).toBe('animate-forwards')
  })

  it('animation: back-in-down 1s linear 1;', () => {
    expect(toUnocss('animation: back-in-down 1s linear 1;')).toBe('animate-back-in-down')
  })
})
