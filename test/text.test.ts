import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('text', () => {
  it('text-left', () => {
    expect(toUnocss('text-align:left')).toBe('text-left')
  })

  it('text-right', () => {
    expect(toUnocss('text-align:right')).toBe('text-right')
  })
  it('text-center', () => {
    expect(toUnocss('text-align:center')).toBe('text-center')
  })

  it('text-ellipsis', () => {
    expect(toUnocss('text-overflow: ellipsis;')).toBe('text-ellipsis')
  })

  it('text-decoration-line: underline;', () => {
    expect(toUnocss('text-decoration-line: underline;')).toBe(
      'underline',
    )
  })

  it('text-decoration-line: none;', () => {
    expect(toUnocss('text-decoration-line: none;')).toBe(
      'no-underline',
    )
  })

  it('text-decoration-color: inherit;', () => {
    expect(toUnocss('text-decoration-color: inherit;')).toBe(
      'decoration-inherit',
    )
  })

  it('text-decoration-color: #000;', () => {
    expect(toUnocss('text-decoration-color: #000;')).toBe(
      'decoration-#000',
    )
  })

  it('text-decoration-style: solid;', () => {
    expect(toUnocss('text-decoration-style: solid;')).toBe(
      'decoration-solid',
    )
  })

  it('text-decoration-thickness: 1px;', () => {
    expect(toUnocss('text-decoration-thickness: 1px;')).toBe(
      'decoration-1px',
    )
  })

  it('text-underline-offset: auto;', () => {
    expect(toUnocss('text-underline-offset: auto;')).toBe(
      'underline-offset-auto',
    )
  })

  it('text-transform: uppercase;', () => {
    expect(toUnocss('text-transform: uppercase;')).toBe('uppercase')
  })

  it('text-indent: 0px;', () => {
    expect(toUnocss('text-indent: 0px;')).toBe('indent-0px')
  })
})
