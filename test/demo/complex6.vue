<template>
  <div @click.stop="onTagClick" class="tag flex-center" :class="[type]">
    {{ tag }}
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['on-tag-click'])

const props = defineProps<{
  tag: string
  type?: string
}>()
function onTagClick() {
  emit('on-tag-click')
}
</script>
<style lang="scss" scoped>
.tag {
  height: 24px;
  line-height: 24px;
  text-align: center;

  background: rgba(99, 214, 173, 0.1);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  color: #3fc193;
  padding: 0 8px;
  box-sizing: border-box;

  &.success {
    color: #3fc193;
    background: rgba(99, 214, 173, 0.1);
  }
  &.primary {
    font-weight: 400;
    color: #4b7bff;
    background: rgba(75, 123, 255, 0.1);
  }
  &.disabled {
    color: var(--color-text-1, #1d2129);
    background: var(--color-fill-3, #e5e6eb);
  }
  &.warning {
    background: rgba(255, 143, 40, 0.1);
    color: #ff8f28;
    font-weight: 400;
  }
}
</style>
