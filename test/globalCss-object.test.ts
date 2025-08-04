import { describe, expect, it } from 'vitest'
import { sassCompiler } from '../src/sassCompiler'

describe('sassCompiler globalCss parameter handling', () => {
  it('should handle globalCss as string', async () => {
    const css = '.test { color: red; }'
    const globalCss = '.global { margin: 0; }'
    
    const result = await sassCompiler(css, 'test.scss', globalCss)
    
    expect(result).toContain('.global')
    expect(result).toContain('.test')
  })

  it('should handle globalCss as object with css property', async () => {
    const css = '.test { color: red; }'
    const globalCss = { css: '.global { margin: 0; }' }
    
    const result = await sassCompiler(css, 'test.scss', globalCss)
    
    expect(result).toContain('.global')
    expect(result).toContain('.test')
  })

  it('should handle globalCss as object with charset false', async () => {
    const css = '.test { color: red; }'
    const globalCss = { css: { charset: false } }
    
    // 这种情况应该忽略 globalCss，只返回原始 CSS
    const result = await sassCompiler(css, 'test.scss', globalCss, true)
    
    expect(result).toContain('.test')
    expect(result).not.toContain('.global')
  })

  it('should handle empty globalCss object', async () => {
    const css = '.test { color: red; }'
    const globalCss = {}
    
    const result = await sassCompiler(css, 'test.scss', globalCss)
    
    expect(result).toContain('.test')
  })

  it('should handle invalid globalCss types', async () => {
    const css = '.test { color: red; }'
    const globalCss = 123 // 无效类型
    
    const result = await sassCompiler(css, 'test.scss', globalCss as any, true)
    
    expect(result).toContain('.test')
  })

  it('should handle null globalCss', async () => {
    const css = '.test { color: red; }'
    const globalCss = null
    
    const result = await sassCompiler(css, 'test.scss', globalCss)
    
    expect(result).toContain('.test')
  })
})
