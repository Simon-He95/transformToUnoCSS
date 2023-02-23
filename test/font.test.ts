import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('font-size', () => {
  it('rem', () => {
    expect(transformToUnocss('font-size: 1.5rem')).toBe('text-1.5rem')
  })
  it('em', () => {
    expect(transformToUnocss('font-size: 1.25em')).toBe('text-1.25em')
  })
  it('px', () => {
    expect(transformToUnocss('font-size: 10px')).toBe('text-10px')
  })
})

describe('font-weight', () => {
  it('100', () => {
    expect(transformToUnocss('font-weight: 100')).toBe('font-100')
  })
  it('bold', () => {
    expect(transformToUnocss('font-weight: bold')).toBe('font-bold')
  })
})

describe('font-style', () => {
  it('italic', () => {
    expect(transformToUnocss('font-style: italic;')).toBe('font-italic')
  })
  it('normal', () => {
    expect(transformToUnocss('font-style: normal;')).toBe('font-not-italic')
  })
})

describe('font-family', () => {
  it('sans', () => {
    expect(transformToUnocss('font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";')).toBe('font-sans')
  })

  it('mono', () => {
    expect(transformToUnocss('  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;')).toBe('font-mono')
  })
})

describe('font-variant-numeric', () => {
  it('normal', () => {
    expect(transformToUnocss('font-variant-numeric: normal;')).toBe('normal-nums')
  })

  it('ordinal', () => {
    expect(transformToUnocss('font-variant-numeric: ordinal;')).toBe('ordinal')
  })
})

