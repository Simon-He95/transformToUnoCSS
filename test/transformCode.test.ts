import fsp from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'

describe('transformCode', () => {
  it('transformCode: all', async () => {
    const demos = await fsp.readdir('./test/demo')
    const contents = await Promise.all(
      demos.map(async (demo) => {
        const url = `./test/demo/${demo}`
        const filepath = path.resolve(process.cwd(), url)
        const suffix = demo.endsWith('.vue')
          ? 'vue'
          : demo.endsWith('.tsx')
            ? 'tsx'
            : ''
        if (!suffix) return

        return `\n\n-----    ${demo}     -------\n\n${await transfromCode(
          await fsp.readFile(url, 'utf-8'),
          {
            filepath,
            type: suffix,
          },
        )}`
      }),
    )

    await expect(contents.filter(Boolean)).toMatchFileSnapshot(
      './__snapshots__/all.test.ts.snap',
    )
  })
})

describe('single demo classWeight', async () => {
  const demo = await fsp.readFile('./test/demo/classWeight.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/classWeight.vue')
  it('classWeight.vue', async () => {
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classWeight.test.ts.snap')
  })
})

describe('single demo classCombine', () => {
  it('classCombine.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classCombine.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classCombine.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classCombine.test.ts.snap')
  })
})

describe('single demo classTail', () => {
  it('classTail.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classTail.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classTail.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classTail.test.ts.snap')
  })
})

describe('single demo Media', () => {
  it('media.vue', async () => {
    const demo = await fsp.readFile('./test/demo/media.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/media.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/media.test.ts.snap')
  })
})

describe('classSpace.vue', () => {
  it('classSpace.vue', async () => {
    const demo = await fsp.readFile('./test/demo/classSpace.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/classSpace.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/classSpace.test.ts.snap')
  })
})

describe('single demo styleWeight', () => {
  it('styleWeight.vue', async () => {
    const demo = await fsp.readFile('./test/demo/styleWeight.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/styleWeight.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/styleWeight.test.ts.snap')
  })
})

describe('single test', () => {
  it('single.vue', async () => {
    const demo = await fsp.readFile('./test/demo/test.vue', 'utf-8')
    const filepath = path.resolve(process.cwd(), './test/demo/test.vue')
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/test.test.ts.snap')
  })
})

describe('single demo vue.tsx', () => {
  it('vue.tsx', async () => {
    const _path = './test/demo/vue.tsx'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'tsx' }),
    ).toMatchFileSnapshot('./__snapshots__/vue.test.ts.snap')
  })
})

describe('single demo test-1.vue', () => {
  it('test-1.vue', async () => {
    const _path = './test/demo/test-1.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/test-1.test.ts.snap')
  })
})

describe('single demo complex1.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex1.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex1.test.ts.snap')
  })
})

describe('single demo complex2.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex2.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex2.test.ts.snap')
  })
})

describe('single demo complex3.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex3.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex3.test.ts.snap')
  })
})

describe('single demo complex4.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex4.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex4.test.ts.snap')
  })
})

describe('single demo complex5.vue', () => {
  it('complex.vue', async () => {
    const _path = './test/demo/complex5.vue'
    const demo = await fsp.readFile(_path, 'utf-8')
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex5.test.ts.snap')
  })
})

describe('single demo complex6.vue', async () => {
  const _path = './test/demo/complex6.vue'
  const demo = await fsp.readFile(_path, 'utf-8')

  it('complex.vue', async () => {
    const filepath = path.resolve(process.cwd(), _path)
    await expect(
      await transfromCode(demo, { filepath, type: 'vue' }),
    ).toMatchFileSnapshot('./__snapshots__/complex6.test.ts.snap')
  })
})

describe('debug mode', () => {
  it('should output debug logs when debug mode is enabled', async () => {
    const testVueCode = `<template>
  <div class="container">
    <h1 class="title">Debug Test</h1>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}
</style>`

    // 捕获控制台输出
    const originalConsoleLog = console.log
    const logs: string[] = []
    console.log = (...args) => {
      // 将参数转换为字符串
      const logString = args.map(arg => {
        if (typeof arg === 'string') {
          return arg
        }
        return String(arg)
      }).join(' ')
      logs.push(logString)
      originalConsoleLog(...args)
    }

    try {
      // 测试 debug 模式
      await transfromCode(testVueCode, {
        type: 'vue',
        debug: true
      })

      // 验证是否有 debug 日志输出
      const debugLogs = logs.filter(log => log.includes('[DEBUG]'))
      expect(debugLogs.length).toBeGreaterThan(0)
      
      // 验证特定的 debug 消息
      expect(debugLogs.some(log => log.includes('transformVue started'))).toBe(true)
      expect(debugLogs.some(log => log.includes('transformCss started'))).toBe(true)
      
    } finally {
      // 恢复原始的 console.log
      console.log = originalConsoleLog
    }
  })

  it('should output debug logs for inline styles when debug mode is enabled', async () => {
    const testVueCodeWithInlineStyles = `<template>
  <div style="width: 100px; height: 50px; background-color: red;">
    <span style="font-size: 14px; color: blue;">Test</span>
  </div>
</template>

<style scoped>
.test {
  margin: 10px;
}
</style>`

    // 捕获控制台输出
    const originalConsoleLog = console.log
    const logs: string[] = []
    console.log = (...args) => {
      // 将参数转换为字符串
      const logString = args.map(arg => {
        if (typeof arg === 'string') {
          return arg
        }
        return String(arg)
      }).join(' ')
      logs.push(logString)
      originalConsoleLog(...args)
    }

    try {
      // 测试 debug 模式
      await transfromCode(testVueCodeWithInlineStyles, {
        type: 'vue',
        debug: true
      })

      // 验证是否有内联样式相关的 debug 日志输出
      const inlineStyleDebugLogs = logs.filter(log => log.includes('[DEBUG] transformInlineStyle processing'))
      expect(inlineStyleDebugLogs.length).toBeGreaterThan(0)
      
      // 验证特定的内联样式处理日志
      expect(inlineStyleDebugLogs.some(log => log.includes('width: 100px; height: 50px; background-color: red;'))).toBe(true)
      expect(inlineStyleDebugLogs.some(log => log.includes('font-size: 14px; color: blue;'))).toBe(true)
      
    } finally {
      // 恢复原始的 console.log
      console.log = originalConsoleLog
    }
  })
})
