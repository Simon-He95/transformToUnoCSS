import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('whitespace', () => {
  it('white-space: normal;', () => {
    expect(transformToUnocss('white-space: normal;')).toBe('whitespace-normal')
  })

  it('white-space: pre-wrap;', () => {
    expect(transformToUnocss('white-space: pre-wrap;')).toBe('whitespace-pre-wrap')
  })
})
