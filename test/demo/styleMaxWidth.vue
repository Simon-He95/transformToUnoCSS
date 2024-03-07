<script setup lang="ts"></script>

<template>
  <div class="red">
    nihao
  </div>
  <div class="yellow">
    hi
  </div>
</template>

<style scoped>
.red + div {
  max-width: calc(100% - 50px);
  background-color: rgba(255, 62, 0, 0.1);
}
</style>
