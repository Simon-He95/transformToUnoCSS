<template>
  <div class="user-item" @click="onClick">
    <span class="checkbox" v-if="pickMode" :class="{ checked: checked }"></span>
    <ChannelAvatar
      :avatar="avatar"
      :name="name"
      :color-seed="colorSeed"
      :isOneToOne="item?.one_to_one == 1"
    >
    </ChannelAvatar>
    <div class="user-item__info">
      <div class="flex flex-row items-center gap-1">
        <div
          v-if="showedName"
          class="name"
          :class="[!department && '!max-w-[150px]']"
        >
          {{ showedName }}
        </div>
        <ExternalTag v-if="is_external" class="whitespace-nowrap"></ExternalTag>
        <div
          class="text-gray-500 text-xs font-normal truncate"
          v-if="is_external && isSingleChatUser && showedTenantName"
        >
          {{ showedTenantName }}
        </div>
      </div>
      <div class="user-item__info__department">{{ department }}</div>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { stringToHashNum } from '@renderer/apps/nextim/utils/avatarSeed'
import { computed } from 'vue'
import ChannelAvatar from '../channel/ChannelAvatar.vue'
import { loginStore } from '@renderer/apps/nextim/stores/login/login.store'
import { globalStore } from '@renderer/apps/nextim/stores/global.store'
import ExternalTag from '@renderer/apps/nextim/components/contact/ExternalTag.vue'
const props = defineProps<{
  pickMode: boolean
  avatar?: string
  name: string
  checked?: boolean
  item: any
}>()

// 是否是单聊用户
const isSingleChatUser = computed(() => props.item.one_to_one === 1)

const showedName = computed(() => {
  const text = props.name || props.item.display_name || ''
  if (text.length > 15) {
    return Array.from(text).slice(0, 12).join('') + '...'
  } else {
    return text
  }
})
const is_external = computed(() => {
  // console.log('useritem', props.item)
  // return props.item.tenant_id !== globalStore.tenant_id && !props.item.type
  return props.item.is_external === 1
})
const showedTenantName = computed(() => {
  if (props.item.tenant_id === globalStore.tenant_id) return ''

  const tenant = loginStore.allTenantMap.get(props.item.tenant_id)
  if (tenant) {
    return tenant.tenantDisplayName || tenant.tenantName || ''
  }
})
const department = computed(() => {
  if (props.item.department) {
    return props.item.department
  }
  return ''
})
const colorSeed = computed(() => {
  if (props.item.id) {
    const numb = stringToHashNum(props.item.id)
    return numb
  } else {
    return 10000
  }
})
const emits = defineEmits(['click'])
const onClick = () => {
  emits('click')
}
</script>
<style lang="scss" scoped>
.user-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-height: 28px;
  overflow: hidden;
  padding: 8px 12px;
  box-sizing: content-box;
  background: #fff;
  align-items: center;
  cursor: default;

  &:hover {
    background: var(--gray-08, rgba(245, 246, 248, 0.8));
  }

  .checkbox {
    width: 16px;
    height: 16px;
    display: block;
    margin-top: 8px;
    align-self: flex-start;

    //宽度不能被压缩
    flex-shrink: 0;
    background-image: url('@renderer/apps/nextim/assets/uncheck.svg');

    &.checked {
      background-image: url('@renderer/apps/nextim/assets/checked.svg');
    }
  }

  .avatar {
    height: 28px;
    width: 28px;
    line-height: 28px;
    //靠顶部
    align-self: flex-start;

    img {
      height: 100%;
      width: 100%;
    }

    &.avatar-text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #8b91a0;
      background-color: #d9dce5;
      border-radius: 20px;
    }
  }

  .user-item__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    //宽度不超过父元素
    flex-shrink: 1;
    max-width: 200px;

    .user-item__info__department {
      //宽度不能超过父元素的宽度
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      color: #6b7280;
      //最多显示两行 ，超出后结尾显示...
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }

    .name {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      overflow: hidden;
      min-height: 20px;
      max-width: 70px;
      white-space: nowrap;
      flex-shrink: 0;
      text-overflow: ellipsis;
      color: var(--color-text-1);
      word-break: break-all;
    }
  }

  .extra {
    flex-shrink: 0;
  }
}
</style>
