<script setup lang="ts"></script>

<template>
  <div class="red" style="background: red; width: 100%; line-height: 20px">
    nihao
  </div>
  <div class="yellow">
    hi
  </div>
</template>

<style scoped>
.red + .yellow {
  background-color: yellow !important;
  width: 100%;
}

.red + div {
  height: 100%;
}
</style>
