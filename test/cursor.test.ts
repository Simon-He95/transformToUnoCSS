import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('cursor', () => {
  it('cursor: pointer', () => {
    expect(toUnocss('cursor: pointer')).toBe('cursor-pointer')
  })

  it('cursor: default', () => {
    expect(toUnocss('cursor: default')).toBe('cursor-default')
  })

  it('cursor: grab', () => {
    expect(toUnocss('cursor: grab')).toBe('cursor-grab')
  })

  it('cursor: help', () => {
    expect(toUnocss('cursor: help')).toBe('cursor-help')
  })

  it('cursor: none', () => {
    expect(toUnocss('cursor: none')).toBe('cursor-none')
  })

  it('cursor: zoom-in', () => {
    expect(toUnocss('cursor: zoom-in')).toBe('cursor-zoom-in')
  })

  it('cursor: url("hyper.cur"), auto;', () => {
    expect(toUnocss('cursor: url("hyper.cur"), auto;')).toBe(
      'cursor="[url(hyper.cur),auto]"',
    )
  })

  it('cursor: url(hyper.cur), auto;', () => {
    expect(toUnocss('cursor: url(hyper.cur), auto;')).toBe(
      'cursor="[url(hyper.cur),auto]"',
    )
  })

  it('cursor: not-allowed;', () => {
    expect(toUnocss('cursor: not-allowed;')).toBe('cursor-not-allowed')
  })
})
