import { describe, expect, it } from 'vitest'
import { compilerCss } from '../src/compilerCss'

describe('compilerCss globalCss normalization', () => {
  it('passes css string from object to less compiler', async () => {
    const result = await compilerCss(
      '.title { color: red; }',
      'less',
      'test.less',
      { css: '.global { margin: 0; }' },
    )

    expect(result).toContain('.global')
    expect(result).toContain('.title')
  })

  it('passes css string from object to stylus compiler', async () => {
    const result = await compilerCss(
      '.title\n  color: red',
      'stylus',
      'test.styl',
      { css: '.global\n  margin: 0' },
    )

    expect(result).toContain('.global')
    expect(result).toContain('.title')
  })
})
