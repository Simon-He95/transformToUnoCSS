import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'node14',
  format: ['cjs', 'esm'],
  clean: true,
  platform: 'node', // Specify the platform to handle import.meta correctly
  metafile: true, // Generate metafile for better analysis
  external: [
    'vite',
    'webpack',
    'rollup',
    'esbuild',
    'fast-glob',
    'unocss',
  ],
  dts: {
    resolve: true,
    // build types for `src/index.ts` only
    // otherwise `Options` will not be exported by `tsup`, not sure how this happens, probably a bug in rollup-plugin-dts
    entry: './src/index.ts',
  },
  esbuildOptions(options) {
    // Handle import.meta.url in both ESM and CJS formats
    options.define = {
      ...options.define,
      'import.meta.url': 'import_meta_url',
    }
    options.banner = {
      js: `const import_meta_url = require('url').pathToFileURL(__filename).toString();`,
    }
  },
})
