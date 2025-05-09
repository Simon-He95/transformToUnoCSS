<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <el-popover placement="right-start" v-model="visible" width="auto">
        <div class="add-node-popover-body">
          <a class="add-node-popover-item approver" @click="addType(1)">
            <div class="item-wrapper">
              <span class="iconfont"></span>
            </div>
            <p>审批人</p>
          </a>
          <a class="add-node-popover-item notifier" @click="addType(2)">
            <div class="item-wrapper">
              <span class="iconfont"></span>
            </div>
            <p>抄送人</p>
          </a>
          <a class="add-node-popover-item condition" @click="addType(4)">
            <div class="item-wrapper">
              <span class="iconfont"></span>
            </div>
            <p>条件分支</p>
          </a>
        </div>
        <template #reference>
          <button class="btn" type="button">
            <span class="iconfont"></span>
          </button>
        </template>
      </el-popover>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -webkit-nihao-flex: 1;
  -ms-flex-positive: 1;
  position: relative;
}
</style>
