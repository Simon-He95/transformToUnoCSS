<template>
  <div class="test-use-syntax">
    <div class="basic-use">Basic @use test</div>
    <div class="use-as-namespace">@use with namespace test</div>
    <div class="use-with-config">@use with configuration test</div>
  </div>
</template>

<style lang="scss">
// 基本 @use 语法
@use './use-syntax.scss';

// @use 带命名空间
@use './variables.scss' as vars;

.test-use-syntax {
  .basic-use {
    @include use-syntax.test-mixin();
  }
  
  .use-as-namespace {
    color: vars.$primary-color;
    font-size: vars.$font-size;
  }
  
  .use-with-config {
    color: blue;
    font-size: 18px;
  }
}
</style>
