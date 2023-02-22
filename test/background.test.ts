import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'
describe('background', () => {
  it('background:red', () => {
    expect(transformToUnocss('background:red')).toBe('bg-red')
  })

  it('background:auto', () => {
    expect(transformToUnocss('background:auto')).toBe('bg-auto')
  })
  // size
  it('background-size:auto', () => {
    expect(transformToUnocss('background-size:auto')).toBe('bg-auto')
  })

  it('background-size:cover', () => {
    expect(transformToUnocss('background-size:cover')).toBe('bg-cover')
  })

  it('background-size:contain', () => {
    expect(transformToUnocss('background-size:contain')).toBe('bg-contain')
  })

  // attachments
  it('background-attachments:fixed', () => {
    expect(transformToUnocss('background-attachments:fixed')).toBe('bg-fixed')
  })

  // clip
  it('background-clip:border-box', () => {
    expect(transformToUnocss('background-clip:border-box')).toBe('bg-clip-border')
  })

  it('background-clip:test', () => {
    expect(transformToUnocss('background-clip:test')).toBe('bg-clip-test')
  })

  // position
  it('background-position:center', () => {
    expect(transformToUnocss('background-position:center')).toBe('bg-center')
  })

  it('background-position:center center', () => {
    expect(transformToUnocss('background-position:center center')).toBe('bg-center-center')
  })

  // repeats
  it('background-repeat:repeat', () => {
    expect(transformToUnocss('background-repeat:repeat')).toBe('bg-repeat')
  })

  it('background-repeat:no-repeat', () => {
    expect(transformToUnocss('background-repeat:no-repeat')).toBe('bg-no-repeat')
  })

  it('background-repeat:repeat-x', () => {
    expect(transformToUnocss('background-repeat:repeat-x')).toBe('bg-repeat-x')
  })

  it('background-repeat:inherit', () => {
    expect(transformToUnocss('background-repeat:inherit')).toBe('bg-repeat-inherit')
  })

  // origins
  it('background-origin:border-box', () => {
    expect(transformToUnocss('background-origin:border-box')).toBe('bg-origin-border')
  })

  it('background-origin:inherit', () => {
    expect(transformToUnocss('background-origin:inherit')).toBe('bg-origin-inherit')
  })

  // image
  it('background-image:none', () => {
    expect(transformToUnocss('background-image:none')).toBe('bg-none')
  })

  it('background-image:url(\'picture.png\')', () => {
    expect(transformToUnocss('background-image:url(\'picture.png\')')).toBe('bg-[url(\'picture.png\')]')
  })
})
