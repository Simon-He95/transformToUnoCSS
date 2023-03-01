<script setup lang="ts"></script>

<template>
  <div style="background: red; width: 100%; line-height: 20px">
    <div class="container">
      <div class="box" />
      <div class="box" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
}
.box {
  flex: 1;
  height: 100px;
  background-color: red;
}
</style>
