import fsp from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { transfromCode } from '../src'



describe('test-vue-1', async () => {
  const demo = await fsp.readFile('./test/demo/test-vue-1.vue', 'utf-8')
  const filepath = path.resolve(process.cwd(), './test/demo/test-vue-1.vue')
  it('test-vue-1.vue', async () => {
    expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
  })
})


// describe('test-vue-2', async () => {
//   const demo = await fsp.readFile('./test/demo/test-vue-2.vue', 'utf-8')
//   const filepath = path.resolve(process.cwd(), './test/demo/test-vue-2.vue')
//   it('test-vue-2.vue', async () => {
//     expect(await transfromCode(demo, {filepath, type:'vue'})).toMatchSnapshot()
//   })
// })
