<script setup lang="ts">

import {useLockStore} from "@/store/lock.store.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {storeToRefs} from "pinia";

const lockStore = useLockStore();

const {isLock} = storeToRefs(lockStore);

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
    <corn-toggle-enable-cell title="启用状态" v-model="isLock" />

    <van-cell title="密码" :value="lockStore.password" clickable @click="getPassword"/>
  </van-cell-group>
</template>

<style scoped>

</style>
