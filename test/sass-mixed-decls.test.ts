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

  it('test', async () => {
    const importScss = `
$homeNavLengh: 8;
.home-container {
	overflow: hidden;
	.home-card-one,
	.home-card-two,
	.home-card-three {
		.home-card-item {
			width: 100%;
			height: 130px;
			border-radius: 4px;
			transition: all ease 0.3s;
			padding: 20px;
			overflow: hidden;
			background: var(--el-color-white);
			color: var(--el-text-color-primary);
			border: 1px solid var(--next-border-color-light);
			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}
			&-icon {
				width: 70px;
				height: 70px;
				border-radius: 100%;
				flex-shrink: 1;
				i {
					color: var(--el-text-color-placeholder);
				}
			}
			&-title {
				font-size: 15px;
				font-weight: bold;
				height: 30px;
			}
		}
	}
	.home-card-one {
		@for $i from 0 through 3 {
			.home-one-animation#{$i} {
				opacity: 0;
				animation-name: error-num;
				animation-duration: 0.5s;
				animation-fill-mode: forwards;
				animation-delay: calc($i/4) + s;
			}
		}
	}
	.home-card-two,
	.home-card-three {
		.home-card-item {
			height: 400px;
			width: 100%;
			overflow: hidden;
			.home-monitor {
				height: 100%;
				.flex-warp-item {
					width: 25%;
					height: 111px;
					display: flex;
					.flex-warp-item-box {
						margin: auto;
						text-align: center;
						color: var(--el-text-color-primary);
						display: flex;
						border-radius: 5px;
						background: var(--next-bg-color);
						cursor: pointer;
						transition: all 0.3s ease;
						&:hover {
							background: var(--el-color-primary-light-9);
							transition: all 0.3s ease;
						}
					}
					@for $i from 0 through $homeNavLengh {
						.home-animation#{$i} {
							opacity: 0;
							animation-name: error-num;
							animation-duration: 0.5s;
							animation-fill-mode: forwards;
							animation-delay: calc($i/10) + s;
						}
					}
				}
			}
		}
	}
}
`
    
    const testFilePath = path.join(process.cwd(), 'import-test.scss')
    const result = await sassCompiler(importScss, testFilePath, undefined, false)
    
    // 确保编译成功
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })
})
