<script setup lang="ts">

import {useLockStore} from "@/store/lock.store.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";

const lockStore = useLockStore();

const lockStatusText = computed(() => {
  return lockStore.isLock ? "启用" : "停用";
})

function toggleLock() {
  lockStore.isLock = !lockStore.isLock;
}

async function getPassword() {
  const inputPassword = await showInputPopup({
    label: '密码',
    submitText: '设置',
    placeholder: '忘记密码时, 输入: 4321'
  });

  lockStore.password = inputPassword;
}
</script>

<template>
  <van-cell-group title="隐私模式">
    <van-cell title="启用状态" :value="lockStatusText" clickable @click="toggleLock"/>

    <van-cell title="密码" :value="lockStore.password" clickable @click="getPassword"/>
  </van-cell-group>
</template>

<style scoped>

</style>