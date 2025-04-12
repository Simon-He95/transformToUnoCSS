import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  format: ['cjs', 'esm'],
  clean: true,
  platform: 'node', // Specify the platform to handle import.meta correctly
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
    // build types for `src/index.ts` only
    // otherwise `Options` will not be exported by `tsup`, not sure how this happens, probably a bug in rollup-plugin-dts
    entry: './src/index.ts',
  },
})
