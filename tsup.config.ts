import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'node14',
  format: ['cjs', 'esm'],
  clean: true,
  platform: 'node', // 明确指定为 Node.js 平台
  external: [
    'vite',
    'webpack',
    'rollup',
    'esbuild',
    'fast-glob',
    'unocss',
    '@vue/compiler-sfc',
  ],
  dts: {
    resolve: true,
    entry: './src/index.ts',
  },
})
