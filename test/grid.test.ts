import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('grid', () => {
  it('grid-column: auto;', () => {
    expect(transformToUnocss('grid-column: auto;')).toBe('col-auto')
  })

  it('grid-column: span 1 / span 1;', () => {
    expect(transformToUnocss('grid-column: span 2 / span 2;')).toBe('col-span-2')
  })

  it('grid-column: 1 / -1;', () => {
    expect(transformToUnocss('grid-column: 1 / -1;')).toBe('col-span-full')
  })

  it('grid-column-start: 1;', () => {
    expect(transformToUnocss('grid-column-start: 1;')).toBe('col-start-1')
  })

  it('grid-column-end: auto;', () => {
    expect(transformToUnocss('grid-column-end: auto;')).toBe('col-end-auto')
  })

  it('grid-template-rows: repeat(1, minmax(0, 1fr));', () => {
    expect(transformToUnocss('grid-template-rows: repeat(1, minmax(0, 1fr));')).toBe('grid-rows-1')
  })

  it('grid-template-rows: none;', () => {
    expect(transformToUnocss('grid-template-rows: none;')).toBe('grid-rows-none')
  })

  it('grid-row: auto;', () => {
    expect(transformToUnocss('grid-row: auto;')).toBe('row-auto')
  })

  it('grid-row: span 1 / span 1;', () => {
    expect(transformToUnocss('grid-row: span 1 / span 1;')).toBe('row-span-1')
  })

  it('grid-row: 1 / -1;', () => {
    expect(transformToUnocss('grid-row: 1 / -1;')).toBe('row-span-full')
  })

  it('grid-row-start: 1;', () => {
    expect(transformToUnocss('grid-row-start: 1;')).toBe('row-start-1')
  })

  it('grid-auto-flow: row;', () => {
    expect(transformToUnocss('grid-auto-flow: row;')).toBe('grid-flow-row')
  })

  it('grid-auto-flow: column;', () => {
    expect(transformToUnocss('grid-auto-flow: column;')).toBe('grid-flow-col')
  })

  it('grid-auto-flow: column dense;', () => {
    expect(transformToUnocss('grid-auto-flow: column dense;')).toBe('grid-flow-col-dense')
  })

  it('grid-auto-flow: row dense;', () => {
    expect(transformToUnocss('grid-auto-flow: row dense;')).toBe('grid-flow-row-dense')
  })

  it('grid-auto-columns: auto;', () => {
    expect(transformToUnocss('grid-auto-columns: auto;')).toBe('auto-cols-auto')
  })

  it('grid-auto-columns: min-content;', () => {
    expect(transformToUnocss('grid-auto-columns: min-content;')).toBe('auto-cols-min')
  })

  it('grid-auto-columns: minmax(0, 1fr);', () => {
    expect(transformToUnocss('grid-auto-columns: minmax(0, 1fr);')).toBe('auto-cols-fr')
  })

  it('grid-auto-rows: auto;', () => {
    expect(transformToUnocss('grid-auto-rows: auto;')).toBe('auto-rows-auto')
  })

  it('grid-auto-rows: min-content;', () => {
    expect(transformToUnocss('grid-auto-rows: min-content;')).toBe('auto-rows-min')
  })

  it('grid-auto-rows: minmax(0, 1fr);', () => {
    expect(transformToUnocss('grid-auto-rows: minmax(0, 1fr);')).toBe('auto-rows-fr')
  })
})
