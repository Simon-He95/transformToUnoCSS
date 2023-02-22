import { describe, expect, it } from 'vitest'
import { transformToUnocss } from '../src'

describe('list', () => {
  it('list-style-type: unset;', () => {
    expect(transformToUnocss('list-style-type: unset;')).toMatchInlineSnapshot('"list-unset"')
  })
  it('list-style-position: outside;', () => {
    expect(transformToUnocss('list-style-position: outside;')).toMatchInlineSnapshot('"list-outside"')
  })
})
