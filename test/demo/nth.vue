<script setup lang="ts"></script>

<template>
  <div style="background: red; width: 100%; line-height: 20px">
    <div class="red">
      n1
    </div>
    <div class="red">
      n2
    </div>
  </div>
</template>

<style scoped>
.red:nth-child(2) {
  color: yellow;
}
</style>
