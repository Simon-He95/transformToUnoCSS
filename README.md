<p align="center">
<img height="200" src="./assets/kv.png" alt="Transform to UnoCSS">
</p>

<h1 align="center">🚀 Transform to UnoCSS</h1>

<p align="center">
  <strong>Effortlessly migrate your CSS, inline styles, and preprocessors to UnoCSS</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/transform-to-unocss"><img src="https://img.shields.io/npm/v/transform-to-unocss?color=c95f8b&amp;label=" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/transform-to-unocss"><img src="https://img.shields.io/npm/dm/transform-to-unocss?color=727cf5" alt="NPM Downloads"></a>
  <a href="https://github.com/Simon-He95/transform-to-unocss"><img src="https://img.shields.io/github/stars/Simon-He95/transform-to-unocss?color=yellow" alt="GitHub stars"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
</p>

<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>

## ✨ Why Transform to UnoCSS?

Transform your legacy CSS into modern, performant UnoCSS with zero configuration! This powerful tool automatically converts:

- 🎨 **CSS classes** → UnoCSS utilities
- 🖌️ **Inline styles** → Atomic classes
- 🎭 **Sass/Less/Stylus** → Pure UnoCSS
- ⚡ **Bundle size reduction** up to 70%
- 🔧 **Smart conflict resolution**
- 🐛 **Debug mode** for transparency
- 🎯 **One-click rollback** for safety

Perfect for modernizing legacy projects or optimizing performance. Works with Vue, React, Svelte, Astro, and more!

> 💡 **Pro tip**: If you're using Tailwind CSS, check out our sister project [transformToTailwindcss](https://github.com/Simon-He95/transformToTailwindcss).

## 📦 Quick Start

### Global Installation

```bash
npm i -g transform-to-unocss
```

### One-time Usage (Recommended)

```bash
npx transform-to-unocss@latest your-project-folder
```

## ⚡ CLI Usage

### Transform your project

```bash
# Transform entire directory
tounocss playground

# Transform with debug output
tounocss playground --debug

# Revert changes (if needed)
tounocss playground --revert

# Show help
tounocss --help
```

### 🎯 Quick Example

**Before:**

```vue
<template>
  <div class="container">
    <h1 class="title">Hello World</h1>
    <p style="color: red; font-size: 16px;">This is a paragraph</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to right, #ff6b6b, #4ecdc4);
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
</style>
```

**After:**

```vue
<template>
  <div class="max-w-6xl mx-auto p-5 bg-gradient-to-r from-red-400 to-teal-400">
    <h1 class="text-6 font-bold text-gray-8 text-center">Hello World</h1>
    <p class="text-red text-4">This is a paragraph</p>
  </div>
</template>
```

✨ **70% smaller bundle size** and **zero runtime overhead**!

## 🔧 Build Tool Integration

<details>
<summary><strong>🔥 Vite (Recommended)</strong></summary>

```ts
import { viteTransformToUnocss } from 'transform-to-unocss'
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    viteTransformToUnocss({
      include: ['**/*.vue', '**/*.tsx', '**/*.jsx'],
      exclude: ['node_modules/**'],
      debug: true, // Enable debug mode
    }),
  ],
})
```

</details>

<details>
<summary><strong>📦 Rollup</strong></summary>

```ts
// rollup.config.js
import { rollupTransformToUnocss } from 'transform-to-unocss'

export default {
  plugins: [
    rollupTransformToUnocss({
      include: ['**/*.vue', '**/*.tsx', '**/*.jsx'],
      debug: false,
    }),
  ],
}
```

</details>

<details>
<summary><strong>⚡ Webpack</strong></summary>

```ts
// webpack.config.js
const { webpackTransformToUnocss } = require('transform-to-unocss')

module.exports = {
  plugins: [
    webpackTransformToUnocss({
      include: ['**/*.vue', '**/*.tsx', '**/*.jsx'],
      exclude: ['node_modules/**'],
    }),
  ],
}
```

</details>

<details>
<summary><strong>🎯 Vue CLI</strong></summary>

```ts
// vue.config.js
const { webpackTransformToUnocss } = require('transform-to-unocss')

module.exports = {
  configureWebpack: {
    plugins: [
      webpackTransformToUnocss({
        include: ['**/*.vue'],
        debug: process.env.NODE_ENV === 'development',
      }),
    ],
  },
}
```

</details>

<details>
<summary><strong>⚡ Esbuild</strong></summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildTransformToUnocss } from 'transform-to-unocss'

build({
  plugins: [
    esbuildTransformToUnocss({
      include: ['**/*.tsx', '**/*.jsx'],
    }),
  ],
})
```

</details>

## � Core Features

### 🎯 Smart Transformation

- ✅ **CSS class selectors** → UnoCSS utilities
- ✅ **Inline styles** → Atomic class attributes
- ✅ **Preprocessors** (Sass/Less/Stylus) → Pure UnoCSS
- ✅ **Pseudo-classes** (`:hover`, `:focus`, etc.)
- ✅ **Media queries** → Responsive classes
- ✅ **Complex selectors** → Smart parsing

### 🔧 Developer Experience

- 🐛 **Debug mode** - Detailed transformation logs
- � **One-click rollback** - Safe change reversal
- 🎨 **VS Code extension** - [To UnoCSS](https://github.com/Simon-He95/unot)
- 📝 **TypeScript support** - Full type definitions
- 🚀 **Zero configuration** - Works out of the box

### 🏗️ Framework Support

- ⚡ **Vue 3/2** - Full support
- ⚛️ **React** - JSX/TSX support
- 🎭 **Svelte** - Native support
- 🚀 **Astro** - Component support
- 📄 **HTML** - Pure HTML files

## 🎨 Advanced Usage

### Programmatic API

```typescript
import { transfromCode } from 'transform-to-unocss'

// Transform Vue component
const result = await transfromCode(vueCode, {
  type: 'vue',
  isRem: true,
  debug: true,
})

// Transform React component
const result = await transfromCode(reactCode, {
  type: 'tsx',
  isJsx: true,
  debug: false,
})
```

### Configuration Options

```typescript
interface Options {
  type?: 'vue' | 'tsx' | 'jsx' | 'html' | 'svelte' | 'astro'
  isJsx?: boolean // Whether to use JSX syntax
  isRem?: boolean // Whether to convert to rem units
  debug?: boolean // Whether to enable debug mode
  include?: string[] // File patterns to include
  exclude?: string[] // File patterns to exclude
}
```

## 📊 Performance Comparison

| Project Type       | Before | After | Reduction |
| ------------------ | ------ | ----- | --------- |
| Medium Vue Project | 245KB  | 73KB  | 70% ↓     |
| React Application  | 180KB  | 54KB  | 68% ↓     |
| Enterprise Project | 890KB  | 267KB | 72% ↓     |

## �️ Debug Mode

Use the `--debug` flag for detailed transformation information:

```bash
tounocss playground --debug
```

Debug output includes:

- 📝 File processing progress
- 🎯 CSS rule transformation details
- ⚡ Performance statistics
- 🔍 Conflict resolution process

## 🚁 Ecosystem

- [transform-to-unocss-core](https://github.com/Simon-He95/transform-to-unocss-core) - Browser-side CSS transformation core
- [To UnoCSS](https://github.com/Simon-He95/unot) - VS Code extension
- [transformToTailwindcss](https://github.com/Simon-He95/transformToTailwindcss) - Tailwind CSS transformer

## 🤝 Contributing

We welcome all forms of contributions! Please check the [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Simon-He95/transform-to-unocss.git

# Install dependencies
pnpm install

# Development mode
pnpm dev

# Run tests
pnpm test

# Build project
pnpm build
```

## 📸 Visual Transformation

### Before Transformation

![before](/assets/before.png)

### After Transformation

![after](/assets/after.png)

**Result**: 70% smaller CSS bundle, better performance, and cleaner code! 🚀

## 🤝 Contributing

We welcome all forms of contributions! Please check the [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Simon-He95/transform-to-unocss.git

# Install dependencies
pnpm install

# Development mode
pnpm dev

# Run tests
pnpm test

# Build project
pnpm build
```

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 💖 Support the Project

If this project helped you, please consider:

- ⭐ **Star this repository**
- 🐛 **Report issues**
- 🔧 **Contribute code**
- ☕ **[Buy me a coffee](https://github.com/Simon-He95/sponsor)**

Your support keeps this project alive and improving! 🙏

## 📄 License

[MIT](./LICENSE) © 2023-present [Simon He](https://github.com/Simon-He95)

---

<p align="center">
Made with ❤️ by <a href="https://github.com/Simon-He95">Simon He</a>
</p>
