import fsp from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'



describe('test-vue', async () => {
  const demo = await fsp.readFile('./test/demo/test-vue.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test-vue.vue')
  it('test-vue.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})
