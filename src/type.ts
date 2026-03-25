import type { FilterPattern } from '@rollup/pluginutils'

export type SuffixType = 'vue' | 'tsx' | 'jsx' | 'html' | 'astro' | 'svelte'
export type CssType = 'less' | 'scss' | 'css' | 'stylus'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  // optional resolve alias map from bundler (vite/rollup) config
  resolveAlias?: any
}
