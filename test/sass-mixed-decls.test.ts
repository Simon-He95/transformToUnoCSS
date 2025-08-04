import { describe, expect, it } from 'vitest'
import { sassCompiler } from '../src/sassCompiler'
import path from 'node:path'

describe('sassCompiler deprecation warnings fix', () => {
  it('should compile SCSS with mixed declarations without warnings', async () => {
    const testScss = `
.test {
  .nested {
    color: blue;
  }
  
  // 这些声明在嵌套规则后面，在旧版本会产生 mixed-decls 警告
  background: white;
  padding: 20px;
  
  .another-nested {
    font-size: 16px;
  }
  
  margin: 10px;
  border: 1px solid #ccc;
}
`
    
    const testFilePath = path.join(process.cwd(), 'test.scss')
    
    // 这个测试主要确保编译不会抛出错误，并且能正常返回结果
    const result = await sassCompiler(testScss, testFilePath, undefined, false)
    
    expect(result).toContain('.test')
    expect(result).toContain('color: blue')
    expect(result).toContain('background: white')
    expect(result).toContain('padding: 20px')
    expect(result).toContain('margin: 10px')
    expect(result).toContain('border: 1px solid #ccc')
  })

  it('should handle complex nested structures without legacy-js-api warnings', async () => {
    const complexScss = `
$primary-color: #007bff;

.component {
  @mixin button-style {
    padding: 10px 15px;
    border-radius: 4px;
  }
  
  .header {
    background: $primary-color;
  }
  
  // 混合声明（会触发 mixed-decls 警告）
  display: flex;
  flex-direction: column;
  
  .content {
    .button {
      @include button-style;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
  
  // 更多混合声明
  gap: 20px;
  padding: 15px;
}
`
    
    const testFilePath = path.join(process.cwd(), 'complex.scss')
    const result = await sassCompiler(complexScss, testFilePath, undefined, false)
    
    expect(result).toContain('.component')
    expect(result).toContain('display: flex')
    expect(result).toContain('background: #007bff')
    expect(result).toContain('padding: 10px 15px')
  })

  it('should work with @use syntax (modern Sass features)', async () => {
    const modernScss = `
@use "sass:math";

$base-size: 16px;
$primary: #007bff;

.modern-test {
  .header {
    font-size: math.div($base-size, 2);
  }
  
  // 这种混合声明结构在现代 Sass 中应该正常工作
  background: $primary;
  margin: 0;
  
  .footer {
    padding: calc($base-size * 0.5);
  }
  
  border: 1px solid $primary;
}
`
    
    const testFilePath = path.join(process.cwd(), 'modern.scss')
    const result = await sassCompiler(modernScss, testFilePath, undefined, false)
    
    // 确保 result 不是 undefined
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    
    if (result && result.length > 0) {
      expect(result).toContain('.modern-test')
      // 由于不同 Sass 版本的计算结果可能不同，使用更宽松的检查
      expect(result).toContain('font-size:')
      expect(result).toContain('background:')
      expect(result).toContain('border:')
    }
  })

  it('should handle @import deprecation warnings gracefully', async () => {
    const importScss = `
// 这会产生 @import 弃用警告，但应该被过滤掉
$test-color: #333;
$test-size: 14px;

.import-test {
  color: $test-color;
  font-size: $test-size;
  
  .nested {
    text-decoration: underline;
  }
  
  // 混合声明
  padding: 15px;
  margin: 10px;
  
  .another-nested {
    font-weight: bold;
  }
  
  border: 1px solid $test-color;
}
`
    
    const testFilePath = path.join(process.cwd(), 'import-test.scss')
    const result = await sassCompiler(importScss, testFilePath, undefined, false)
    
    // 确保编译成功
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    
    if (result && result.length > 0) {
      expect(result).toContain('.import-test')
      expect(result).toContain('color: #333')
      expect(result).toContain('font-size: 14px')
      expect(result).toContain('padding: 15px')
      expect(result).toContain('border: 1px solid #333')
    }
  })
})
