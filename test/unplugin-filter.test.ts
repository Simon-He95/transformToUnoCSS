import { describe, expect, it } from 'vitest'
import { createFilter } from '@rollup/pluginutils'

describe('unplugin node_modules filtering', () => {
  it('should exclude node_modules by default', () => {
    // 模拟 unplugin 中的过滤逻辑
    const defaultExclude = ['**/node_modules/**']
    const userExclude: string[] = []
    const finalExclude = [...defaultExclude, ...userExclude]
    
    const filter = createFilter(undefined, finalExclude)
    
    // 测试 node_modules 中的文件应该被过滤掉
    expect(filter('node_modules/echarts/lib/coord/parallel/parallelCreator.js')).toBe(false)
    expect(filter('/Users/project/node_modules/vue/dist/vue.js')).toBe(false)
    expect(filter('C:\\project\\node_modules\\react\\index.js')).toBe(false)
    
    // 测试正常的项目文件应该被包含
    expect(filter('src/components/App.vue')).toBe(true)
    expect(filter('src/pages/Home.tsx')).toBe(true)
    expect(filter('/Users/project/src/utils.ts')).toBe(true)
  })

  it('should allow user to override exclude patterns', () => {
    // 模拟用户提供了额外的排除模式
    const defaultExclude = ['**/node_modules/**']
    const userExclude = ['**/test/**', '**/dist/**']
    const finalExclude = [...defaultExclude, ...userExclude]
    
    const filter = createFilter(undefined, finalExclude)
    
    // node_modules 仍然被排除
    expect(filter('node_modules/some-package/index.js')).toBe(false)
    
    // 用户指定的目录也被排除
    expect(filter('test/unit/spec.js')).toBe(false)
    expect(filter('dist/bundle.js')).toBe(false)
    
    // 正常文件仍然被包含
    expect(filter('src/main.ts')).toBe(true)
  })

  it('should handle transformInclude safety check', () => {
    // 模拟 transformInclude 中的额外安全检查
    function transformInclude(id: string) {
      // 额外的安全检查：确保不处理 node_modules 中的文件
      if (id.includes('node_modules')) {
        return false
      }
      return true // 简化的过滤器，实际中会使用真正的 filter
    }
    
    // 测试 node_modules 路径被拒绝
    expect(transformInclude('node_modules/echarts/lib/coord/parallel/parallelCreator.js')).toBe(false)
    expect(transformInclude('/path/to/project/node_modules/package/file.js')).toBe(false)
    expect(transformInclude('C:\\project\\node_modules\\package\\file.js')).toBe(false)
    
    // 测试正常路径被接受
    expect(transformInclude('src/components/App.vue')).toBe(true)
    expect(transformInclude('/path/to/project/src/main.ts')).toBe(true)
  })
})
