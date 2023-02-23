import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('scroll', () => {
  it('scroll-behavior: auto;', () => {
    expect(transformToUnocss('scroll-behavior: auto;')).toBe('scroll-auto')
  })

  it('scroll-behavior: smooth;', () => {
    expect(transformToUnocss('scroll-behavior: smooth;')).toBe('scroll-smooth')
  })

  it('scroll-margin: 0px;', () => {
    expect(transformToUnocss('scroll-margin: 0px;')).toBe('scroll-m-0px')
  })

  it('scroll-margin-top: 0px;', () => {
    expect(transformToUnocss('scroll-margin-top: 0px;')).toBe('scroll-mt-0px')
  })

  it('scroll-padding: 0px;', () => {
    expect(transformToUnocss('scroll-padding: 0px;')).toBe('scroll-p-0px')
  })

  it('scroll-padding-top: 0px;', () => {
    expect(transformToUnocss('scroll-padding-top: 0px;')).toBe('scroll-pt-0px')
  })

  it('scroll-snap-align: start;', () => {
    expect(transformToUnocss('scroll-snap-align: start;')).toBe('snap-start')
  })

  it('scroll-snap-stop: normal;', () => {
    expect(transformToUnocss('scroll-snap-stop: normal;')).toBe('snap-normal')
  })

  it('scroll-snap-type: none;', () => {
    expect(transformToUnocss('scroll-snap-type: none;')).toBe('snap-none')
  })
})
