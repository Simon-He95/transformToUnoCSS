import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('font-size', () => {
  it('rem', () => {
    expect(toUnocss('font-size: 1.5rem')).toBe('text-1.5rem')
  })
  it('em', () => {
    expect(toUnocss('font-size: 1.25em')).toBe('text-1.25em')
  })
  it('px', () => {
    expect(toUnocss('font-size: 10px')).toBe('text-10px')
  })
})

describe('font-weight', () => {
  it('100', () => {
    expect(toUnocss('font-weight: 100')).toBe('font-100')
  })
  it('bold', () => {
    expect(toUnocss('font-weight: bold')).toBe('font-bold')
  })
})

describe('font-style', () => {
  it('italic', () => {
    expect(toUnocss('font-style: italic;')).toBe('font-italic')
  })
  it('normal', () => {
    expect(toUnocss('font-style: normal;')).toBe('font-not-italic')
  })
})

describe('font-family', () => {
  it('sans', () => {
    expect(
      toUnocss(
        'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
      ),
    ).toBe('font-sans')
  })

  it('mono', () => {
    expect(
      toUnocss(
        '  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
      ),
    ).toBe('font-mono')
  })
})

describe('font-variant-numeric', () => {
  it('normal', () => {
    expect(toUnocss('font-variant-numeric: normal;')).toBe(
      'normal-nums',
    )
  })

  it('ordinal', () => {
    expect(toUnocss('font-variant-numeric: ordinal;')).toBe('ordinal')
  })
})
