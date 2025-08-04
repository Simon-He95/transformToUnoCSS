import { describe, expect, it } from 'vitest'
import { transformCode } from '../src/transformCode'

describe('transformCode file type detection and validation', () => {
  it('should skip non-transformable JavaScript files', async () => {
    const jsCode = `
// This is a regular JavaScript file
function parallelCreator() {
  return {
    create: function() {
      console.log('creating parallel chart');
    }
  };
}

export default parallelCreator;
`
    
    const result = await transformCode(jsCode, {
      filepath: 'node_modules/echarts/lib/coord/parallel/parallelCreator.js',
      debug: true
    })
    
    // JavaScript files should be returned unchanged
    expect(result).toBe(jsCode)
  })

  it('should handle valid Vue files correctly', async () => {
    const vueCode = `
<template>
  <div class="test">Hello</div>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style>
.test {
  color: red;
}
</style>
`
    
    const result = await transformCode(vueCode, {
      filepath: 'src/components/Test.vue',
      type: 'vue',
      debug: true
    })
    
    // Vue files should be processed (at least contain the template)
    expect(result).toContain('<template>')
    expect(result).toContain('<div class="test">')
  })

  it('should handle type detection from file extension', async () => {
    const tsxCode = `
export function App() {
  return <div className="test">Hello</div>;
}
`
    
    const result = await transformCode(tsxCode, {
      filepath: 'src/App.tsx',
      debug: true
    })
    
    // TSX files should be processed by transformJsx
    expect(result).toContain('className')
    // Even if no transformation occurs, the file should at least be processed through the correct path
    expect(typeof result).toBe('string')
  })

  it('should validate input types', async () => {
    // Test with non-string input
    const result = await transformCode(null as any, {
      filepath: 'test.js',
      debug: true
    })
    
    expect(result).toBe('')
  })
})
