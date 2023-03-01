<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="red" style="background: red; width: 100%; line-height: 20px">
      nihao
    </div>
    <div class="yellow">
      hi
    </div>
  </div>
</template>

<style scoped>
.container:focus-within {
  background-color: red;
  width: 100%;
}
</style>
