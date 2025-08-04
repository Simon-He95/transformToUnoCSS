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
})
