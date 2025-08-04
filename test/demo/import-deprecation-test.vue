<!-- 测试 @import 弃用警告修复 -->
<template>
  <div class="import-deprecation-test">
    <h1>Import Deprecation Test</h1>
    <p class="content">This tests the fix for Sass @import deprecation warnings.</p>
  </div>
</template>

<style lang="scss">
// 使用 @import 语法（会在新版本 Sass 中产生弃用警告）
@import 'variables';

// 模拟一些使用了 @import 的样式
.import-deprecation-test {
  background: $primary-color;
  
  .content {
    color: $text-color;
    font-size: $base-font-size;
  }
  
  // 这里也包含了 mixed-decls 的情况
  .nested {
    padding: 10px;
  }
  
  margin: 20px;
  border: 1px solid $border-color;
}

// 另一个使用 @import 的例子
@import 'mixins';

.another-component {
  @include button-mixin;
  
  &:hover {
    opacity: 0.8;
  }
  
  display: flex;
  align-items: center;
}
</style>
