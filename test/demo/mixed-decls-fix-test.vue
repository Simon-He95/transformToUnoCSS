<!-- 测试 Sass mixed-decls 警告修复 -->
<template>
  <div class="mixed-decls-test">
    <h1>Mixed Declarations Test</h1>
    <p class="content">This tests the fix for Sass mixed-decls deprecation warnings.</p>
  </div>
</template>

<style lang="scss">
// 这种写法会在新版本 Sass 中产生 mixed-decls 弃用警告
.mixed-decls-test {
  .content {
    color: blue;
  }
  
  // 这个声明在嵌套规则后面，会触发警告
  background: white;
  padding: 20px;
  
  h1 {
    font-size: 24px;
    
    // 嵌套规则
    &:hover {
      color: red;
    }
  }
  
  // 这里又是一个在嵌套规则后的声明
  margin: 10px;
  border: 1px solid #ccc;
}

// 另一个会产生警告的例子
.another-example {
  .nested {
    font-weight: bold;
  }
  
  // 这些声明在嵌套规则后
  display: flex;
  align-items: center;
  
  .another-nested {
    text-decoration: underline;
  }
  
  // 更多在嵌套规则后的声明
  justify-content: space-between;
  gap: 15px;
}
</style>
