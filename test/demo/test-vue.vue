<script setup lang="ts">
// 这里可以添加你的逻辑
</script>

<template>
  <div class="portal-container">
    <header class="portal-header">
      <h1>门户首页</h1>
      <nav>
        <a href="#">首页</a>
        <a href="#">功能一</a>
        <a href="#">功能二</a>
        <a href="#">关于</a>
      </nav>
    </header>
    <main class="portal-main">
      <section class="welcome-section">
        <h2>欢迎来到门户页面</h2>
        <p>这里是你的 Vue 门户页面示例。</p>
      </section>
      <section class="features-section">
        <h3>功能介绍</h3>
        <ul>
          <li>功能一描述</li>
          <li>功能二描述</li>
          <li>更多功能...</li>
        </ul>
      </section>
    </main>
    <footer class="portal-footer">
      &copy; 2025 门户页面示例
    </footer>
  </div>
</template>

<style scoped>
.portal-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  background: #f5f6fa;
}

.portal-header {
  background: #2d8cf0;
  color: #fff;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.portal-header nav {
  margin-top: 12px;
}

.portal-header a {
  color: #fff;
  margin-right: 20px;
  text-decoration: none;
  font-weight: bold;
}

.portal-header a:hover {
  text-decoration: underline;
}

.portal-main {
  flex: 1;
  padding: 40px 32px;
}

.welcome-section {
  margin-bottom: 32px;
}

.features-section ul {
  padding-left: 20px;
}

.portal-footer {
  background: #222;
  color: #fff;
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
}
</style>
