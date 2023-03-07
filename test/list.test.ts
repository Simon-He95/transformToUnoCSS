import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('list', () => {
  it('list-style-type: unset;', () => {
    expect(toUnocss('list-style-type: unset;')).toMatchInlineSnapshot(
      '"list-unset"',
    )
  })
  it('list-style-position: outside;', () => {
    expect(
      toUnocss('list-style-position: outside;'),
    ).toMatchInlineSnapshot('"list-outside"')
  })
})
