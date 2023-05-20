import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('scroll', () => {
  it('scroll-behavior: auto;', () => {
    expect(toUnocss('scroll-behavior: auto;')).toBe('scroll-auto')
  })

  it('scroll-behavior: smooth;', () => {
    expect(toUnocss('scroll-behavior: smooth;')).toBe('scroll-smooth')
  })

  it('scroll-margin: 0px;', () => {
    expect(toUnocss('scroll-margin: 0px;')).toBe('scroll-m-0px')
  })

  it('scroll-margin-top: 0px;', () => {
    expect(toUnocss('scroll-margin-top: 0px;')).toBe('scroll-mt-0px')
  })

  it('scroll-padding: 0px;', () => {
    expect(toUnocss('scroll-padding: 0px;')).toBe('scroll-p-0px')
  })

  it('scroll-padding-top: 0px;', () => {
    expect(toUnocss('scroll-padding-top: 0px;')).toBe('scroll-pt-0px')
  })

  it('scroll-snap-align: start;', () => {
    expect(toUnocss('scroll-snap-align: start;')).toBe('snap-start')
  })

  it('scroll-snap-stop: normal;', () => {
    expect(toUnocss('scroll-snap-stop: normal;')).toBe('snap-normal')
  })

  it('scroll-snap-type: none;', () => {
    expect(toUnocss('scroll-snap-type: none;')).toBe('snap-none')
  })

  it('scroll-padding-inline-start: 1px;', () => {
    expect(toUnocss('scroll-padding-inline-start: 1px;')).toBe('scroll-ps-1px')
  })

  it('scroll-padding-inline-end: 1px;', () => {
    expect(toUnocss('scroll-padding-inline-end: 1px;')).toBe('scroll-pe-1px')
  })
})
