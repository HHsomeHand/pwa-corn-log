<script setup lang="ts">

import {useLockStore} from "@/store/lock.store.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

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

const {t} = useI18n();
</script>

<template>
  <van-cell-group :title="t('config.lock.cellGroupTitle')">
    <corn-toggle-enable-cell :title="t('config.lock.enableStatus')" v-model="isLock" />

    <van-cell :title="t('config.lock.password')" :value="lockStore.password" clickable @click="getPassword"/>
  </van-cell-group>
</template>

<style scoped>

</style>
