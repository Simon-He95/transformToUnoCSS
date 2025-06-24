import type { FilterPattern } from '@rollup/pluginutils'

export type SuffixType = 'vue' | 'tsx' | 'html' | 'astro' | 'svelte'
export type CssType = 'less' | 'scss' | 'css' | 'stylus'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}
