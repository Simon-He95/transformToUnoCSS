import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('cursor', () => {
  it('cursor: pointer', () => {
    expect(transformToUnocss('cursor: pointer')).toBe('cursor-pointer')
  })

  it('cursor: default', () => {
    expect(transformToUnocss('cursor: default')).toBe('cursor-default')
  })

  it('cursor: grab', () => {
    expect(transformToUnocss('cursor: grab')).toBe('cursor-grab')
  })

  it('cursor: help', () => {
    expect(transformToUnocss('cursor: help')).toBe('cursor-help')
  })

  it('cursor: none', () => {
    expect(transformToUnocss('cursor: none')).toBe('cursor-none')
  })

  it('cursor: zoom-in', () => {
    expect(transformToUnocss('cursor: zoom-in')).toBe('cursor-zoom-in')
  })

  it('cursor: url("hyper.cur"), auto;', () => {
    expect(transformToUnocss('cursor: url("hyper.cur"), auto;')).toBe('cursor-[url("hyper.cur"),auto]')
  })

  it('cursor: url(hyper.cur), auto;', () => {
    expect(transformToUnocss('cursor: url(hyper.cur), auto;')).toBe('cursor-[url(hyper.cur),auto]')
  })
})
