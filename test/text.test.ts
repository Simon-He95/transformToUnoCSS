import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('text', () => {
  it('text-left', () => {
    expect(transformToUnocss('text-align:left')).toBe('text-left')
  })

  it('text-right', () => {
    expect(transformToUnocss('text-align:right')).toBe('text-right')
  })
  it('text-center', () => {
    expect(transformToUnocss('text-align:center')).toBe('text-center')
  })

  it('text-ellipsis', () => {
    expect(transformToUnocss('text-overflow: ellipsis;')).toBe('text-ellipsis')
  })

  it('text-decoration-line: underline;', () => {
    expect(transformToUnocss('text-decoration-line: underline;')).toBe('underline')
  })

  it('text-decoration-line: none;', () => {
    expect(transformToUnocss('text-decoration-line: none;')).toBe('no-underline')
  })

  it('text-decoration-color: inherit;', () => {
    expect(transformToUnocss('text-decoration-color: inherit;')).toBe('decoration-inherit')
  })

  it('text-decoration-color: #000;', () => {
    expect(transformToUnocss('text-decoration-color: #000;')).toBe('decoration-#000')
  })

  it('text-decoration-style: solid;', () => {
    expect(transformToUnocss('text-decoration-style: solid;')).toBe('decoration-solid')
  })

  it('text-decoration-thickness: 1px;', () => {
    expect(transformToUnocss('text-decoration-thickness: 1px;')).toBe('decoration-1px')
  })

  it('text-underline-offset: auto;', () => {
    expect(transformToUnocss('text-underline-offset: auto;')).toBe('underline-offset-auto')
  })

  it('text-transform: uppercase;', () => {
    expect(transformToUnocss('text-transform: uppercase;')).toBe('uppercase')
  })

  it('text-indent: 0px;', () => {
    expect(transformToUnocss('text-indent: 0px;')).toBe('indent-0px')
  })
})
