<template>
  <div>
    <ul class="list-group list-group-striped">
      <li class="list-group-item">
        <Icon class="mr-5px" icon="ep:user" />
        {{ t('profile.user.username') }}
        <div class="pull-right">{{ userInfo?.username }}</div>
      </li>
      <li class="list-group-item">
        <Icon class="mr-5px" icon="ep:phone" />
        {{ t('profile.user.mobile') }}
        <div class="pull-right">{{ userInfo?.mobile }}</div>
      </li>
      <li class="list-group-item">
        <Icon class="mr-5px" icon="fontisto:email" />
        {{ t('profile.user.email') }}
        <div class="pull-right">{{ userInfo?.email }}</div>
      </li>
      <li class="list-group-item">
        <Icon class="mr-5px" icon="ep:calendar" />
        {{ t('profile.user.createTime') }}
        <div class="pull-right">{{ formatDate(userInfo.createTime) }}</div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { formatDate } from '@/utils/formatTime'
import UserAvatar from './UserAvatar.vue'

import { getUserProfile, ProfileVO } from '@/api/system/user/profile'

defineOptions({ name: 'ProfileUser' })

const { t } = useI18n()
const userInfo = ref({} as ProfileVO)
const getUserInfo = async () => {
  const users = await getUserProfile()
  userInfo.value = users
}
onMounted(async () => {
  await getUserInfo()
})
</script>

<style scoped>
.list-group-item {
  padding: 11px 0;
  margin-bottom: -1px;
  font-size: 13px;
  border-top: 1px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
}

.pull-right {
  float: right !important;
}
</style>
