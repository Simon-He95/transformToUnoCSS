import { describe, it, expect } from 'vitest'
import { transformCode } from '../src/index'

describe('Complex SCSS for-loop and variable syntax', () => {
  it('should handle SCSS @for loops with variables correctly', async () => {
    const vueContentWithComplexScss = `
<template>
  <div class="home-container">
    <div class="home-card-one">
      <div class="home-one-animation0">Animation 0</div>
      <div class="home-one-animation1">Animation 1</div>
      <div class="home-one-animation2">Animation 2</div>
      <div class="home-one-animation3">Animation 3</div>
    </div>
    <div class="home-card-two">
      <div class="home-animation0">Nav Item 0</div>
      <div class="home-animation1">Nav Item 1</div>
      <div class="home-animation2">Nav Item 2</div>
      <div class="home-animation3">Nav Item 3</div>
      <div class="home-animation4">Nav Item 4</div>
      <div class="home-animation5">Nav Item 5</div>
      <div class="home-animation6">Nav Item 6</div>
      <div class="home-animation7">Nav Item 7</div>
      <div class="home-animation8">Nav Item 8</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$homeNavLengh: 8;

.home-container {
  overflow: hidden;
  
  .home-card-one,
  .home-card-two {
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
        animation-delay: calc(#{$i}/4) + s;
      }
    }
  }
  
  .home-card-two {
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
            animation-delay: calc(#{$i}/10) + s;
          }
        }
      }
    }
  }
}

// 定义动画关键帧
@keyframes error-num {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
`

    console.log('Testing complex SCSS with @for loops and variables...')
    
    try {
      const result = await transformCode(vueContentWithComplexScss, {
        filepath: 'complex-scss-test.vue',
        debug: true
      })
      
      // 检查结果是否成功生成
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ Complex SCSS compilation succeeded')
      console.log('Original length:', vueContentWithComplexScss.length)
      console.log('Result length:', result.length)
      
      // 验证动画类名是否被正确转换
      expect(result).toContain('home-one-animation0')
      expect(result).toContain('home-one-animation1')
      expect(result).toContain('home-one-animation2')
      expect(result).toContain('home-one-animation3')
      
      expect(result).toContain('home-animation0')
      expect(result).toContain('home-animation1')
      expect(result).toContain('home-animation8')
      
    } catch (error) {
      console.error('❌ Complex SCSS test failed:', error)
      throw error
    }
  })

  it('should handle SCSS variables and calc() functions correctly', async () => {
    const scssWithVariablesAndCalc = `
<template>
  <div class="test-container">
    <div class="item-0">Item 0</div>
    <div class="item-1">Item 1</div>
    <div class="item-2">Item 2</div>
  </div>
</template>

<style lang="scss">
$baseDelay: 0.1;
$itemCount: 3;

.test-container {
  display: flex;
  flex-direction: column;
  
  @for $i from 0 through ($itemCount - 1) {
    .item-#{$i} {
      opacity: 0;
      animation-delay: calc(#{$baseDelay * $i}s);
      transition-delay: #{$i * 100}ms;
      z-index: #{10 + $i};
      
      &:hover {
        transform: translateY(#{$i * -5}px);
      }
    }
  }
}
</style>
`

    try {
      const result = await transformCode(scssWithVariablesAndCalc, {
        filepath: 'scss-variables-calc.vue',
        debug: true
      })
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ SCSS variables and calc() test succeeded')
      
    } catch (error) {
      console.error('❌ SCSS variables and calc() test failed:', error)
      throw error
    }
  })

  it('should handle nested @for loops and complex selectors', async () => {
    const nestedForLoopsScss = `
<template>
  <div class="grid-container">
    <div class="row-0">
      <div class="col-0">Cell 0,0</div>
      <div class="col-1">Cell 0,1</div>
      <div class="col-2">Cell 0,2</div>
    </div>
    <div class="row-1">
      <div class="col-0">Cell 1,0</div>
      <div class="col-1">Cell 1,1</div>
      <div class="col-2">Cell 1,2</div>
    </div>
  </div>
</template>

<style lang="scss">
$rows: 2;
$cols: 3;

.grid-container {
  display: grid;
  
  @for $row from 0 through ($rows - 1) {
    .row-#{$row} {
      display: flex;
      
      @for $col from 0 through ($cols - 1) {
        .col-#{$col} {
          flex: 1;
          padding: #{$row + $col}px;
          margin: #{$row * 2}px #{$col * 3}px;
          
          &:nth-child(#{$col + 1}) {
            background: hsl(#{$row * 60 + $col * 30}, 50%, 75%);
          }
          
          &:hover {
            transform: scale(#{1 + ($row * 0.1) + ($col * 0.05)});
          }
        }
      }
    }
  }
}
</style>
`

    try {
      const result = await transformCode(nestedForLoopsScss, {
        filepath: 'nested-for-loops.vue',
        debug: true
      })
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ Nested @for loops test succeeded')
      
    } catch (error) {
      console.error('❌ Nested @for loops test failed:', error)
      throw error
    }
  })

  it('should handle @for loops with string interpolation and functions', async () => {
    const advancedScssFeatures = `
<template>
  <div class="advanced-container">
    <div class="item-primary-0">Primary 0</div>
    <div class="item-secondary-1">Secondary 1</div>
    <div class="item-success-2">Success 2</div>
  </div>
</template>

<style lang="scss">
$colors: ('primary', 'secondary', 'success');
$baseSize: 16;

@function get-size($multiplier) {
  @return $baseSize * $multiplier;
}

.advanced-container {
  @for $i from 0 through 2 {
    $color: nth($colors, $i + 1);
    
    .item-#{$color}-#{$i} {
      font-size: #{get-size($i + 1)}px;
      padding: #{$i * 4}px #{$i * 8}px;
      margin-bottom: #{$i * 2}px;
      
      // 使用字符串插值和数学运算
      border-width: #{$i + 1}px;
      border-radius: #{$i * 2 + 4}px;
      
      // calc() 函数与变量结合
      width: calc(100% - #{$i * 20}px);
      
      &::before {
        content: "Item #{$i}";
        opacity: #{0.3 + ($i * 0.2)};
      }
      
      &:hover {
        transform: rotate(#{$i * 15}deg) scale(#{1 + ($i * 0.1)});
      }
    }
  }
}
</style>
`

    try {
      const result = await transformCode(advancedScssFeatures, {
        filepath: 'advanced-scss-features.vue',
        debug: true
      })
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ Advanced SCSS features test succeeded')
      
    } catch (error) {
      console.error('❌ Advanced SCSS features test failed:', error)
      throw error
    }
  })

  it('should handle SCSS mixins with parameters and complex selectors', async () => {
    const scssWithMixins = `
<template>
  <div class="mixin-test-container">
    <div class="icon-text">
      <i class="general-icon">📁</i>
      Text with icon
    </div>
    <div class="no-wrap-text">
      This is a very long text that should not wrap and should show ellipsis instead
    </div>
    <div class="ellipsis-text-2">
      This is a multi-line text that should be truncated after 2 lines with ellipsis
    </div>
    <div class="ellipsis-text-3">
      This is another multi-line text that should be truncated after 3 lines with ellipsis and word break
    </div>
    <div class="scrollable-content">
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
    </div>
  </div>
</template>

<style lang="scss">
/* 第三方图标字体间距/大小设置
------------------------------- */
@mixin generalIcon {
	font-size: 14px !important;
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
	width: 24px;
	text-align: center;
	justify-content: center;
}

/* 文本不换行
------------------------------- */
@mixin text-no-wrap() {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

/* 多行文本溢出
  ------------------------------- */
@mixin text-ellipsis($line: 2) {
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: $line;
	-webkit-box-orient: vertical;
}

/* 滚动条(页面未使用) div 中使用：
  ------------------------------- */
// .test {
//   @include scrollBar;
// }
@mixin scrollBar {
	// 滚动条凹槽的颜色，还可以设置边框属性
	&::-webkit-scrollbar-track-piece {
		background-color: #f8f8f8;
	}
	// 滚动条的宽度
	&::-webkit-scrollbar {
		width: 9px;
		height: 9px;
	}
	// 滚动条的设置
	&::-webkit-scrollbar-thumb {
		background-color: #dddddd;
		background-clip: padding-box;
		min-height: 28px;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: #bbb;
	}
}

.mixin-test-container {
  padding: 20px;
  
  .general-icon {
    @include generalIcon;
  }
  
  .no-wrap-text {
    @include text-no-wrap();
    width: 200px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  
  .ellipsis-text-2 {
    @include text-ellipsis(2);
    width: 200px;
    border: 1px solid #ccc;
    padding: 8px;
    margin: 10px 0;
  }
  
  .ellipsis-text-3 {
    @include text-ellipsis(3);
    width: 250px;
    border: 1px solid #ccc;
    padding: 8px;
    margin: 10px 0;
  }
  
  .scrollable-content {
    @include scrollBar;
    width: 200px;
    height: 100px;
    border: 1px solid #ccc;
    padding: 8px;
    overflow-y: auto;
    
    div {
      height: 50px;
      border-bottom: 1px solid #eee;
      padding: 10px;
    }
  }
}
</style>
`

    try {
      const result = await transformCode(scssWithMixins, {
        filepath: 'scss-mixins-test.vue',
        debug: true
      })
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ SCSS mixins test succeeded')
      console.log('Original length:', scssWithMixins.length)
      console.log('Result length:', result.length)
      
      // 验证 mixin 生成的类名是否存在
      expect(result).toContain('general-icon')
      expect(result).toContain('no-wrap-text')
      expect(result).toContain('ellipsis-text-2')
      expect(result).toContain('ellipsis-text-3')
      expect(result).toContain('scrollable-content')
      
    } catch (error) {
      console.error('❌ SCSS mixins test failed:', error)
      throw error
    }
  })

  it('should handle SCSS mixins with default parameters and conditional logic', async () => {
    const advancedMixins = `
<template>
  <div class="advanced-mixins">
    <div class="button-primary">Primary Button</div>
    <div class="button-secondary">Secondary Button</div>
    <div class="card-small">Small Card</div>
    <div class="card-large">Large Card</div>
    <div class="responsive-text">Responsive Text</div>
  </div>
</template>

<style lang="scss">
// 高级 mixin 示例
@mixin button-style($color: #007bff, $size: medium) {
  display: inline-block;
  padding: if($size == small, 4px 8px, if($size == large, 12px 24px, 8px 16px));
  background-color: $color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: if($size == small, 12px, if($size == large, 18px, 14px));
  
  &:hover {
    background-color: darken($color, 10%);
  }
  
  @if $size == large {
    font-weight: bold;
    text-transform: uppercase;
  }
}

@mixin card-layout($padding: 16px, $shadow: true, $border: false) {
  background: white;
  border-radius: 8px;
  padding: $padding;
  
  @if $shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  @if $border {
    border: 1px solid #e0e0e0;
  }
}

@mixin responsive-font($base-size: 16px) {
  font-size: $base-size;
  
  @media (max-width: 768px) {
    font-size: $base-size * 0.875;
  }
  
  @media (min-width: 1200px) {
    font-size: $base-size * 1.125;
  }
}

.advanced-mixins {
  .button-primary {
    @include button-style(#007bff, medium);
  }
  
  .button-secondary {
    @include button-style(#6c757d, small);
  }
  
  .card-small {
    @include card-layout(12px, true, false);
    width: 200px;
  }
  
  .card-large {
    @include card-layout(24px, true, true);
    width: 300px;
  }
  
  .responsive-text {
    @include responsive-font(18px);
  }
}
</style>
`

    try {
      const result = await transformCode(advancedMixins, {
        filepath: 'advanced-mixins-test.vue',
        debug: true
      })
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      
      console.log('✅ Advanced SCSS mixins test succeeded')
      
    } catch (error) {
      console.error('❌ Advanced SCSS mixins test failed:', error)
      throw error
    }
  })
})
