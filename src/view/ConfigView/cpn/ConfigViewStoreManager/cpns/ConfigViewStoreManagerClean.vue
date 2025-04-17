<script setup lang="ts">

import {showToast} from "vant";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store";
import {LogStoreKey} from "@/injectionKeys.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const appStore = useAppStore();

async function clearCurr() {
  if (await getConfirm()) {
    // let store = inject(LogStoreKey);

    const store = useLogStoreFactory(appStore.currentMode.storeName)();

    await store.clearLogs();
  }
}

async function clearAll() {
  if (await getConfirm()) {
    const storeNames = Object.entries(appStore.customAppMode)
        .map(([key, value]) => value.storeName);

    for (const storeName of storeNames) {
      const store = useLogStoreFactory(storeName)();

      await store.clearLogs();
    } // END for (const storeName of storeNames) {
  }
}

async function getConfirm(): Promise<boolean> {
  // "您是否确认删除? 此操作不可逆"
  showToast(t('config.backup.clean.areYouSure'));

  const confirm = await showInputPopup({
    // label: '确认'
    label: t('config.backup.clean.confirm'),
    // submitText: '确认清空',
    submitText: t('config.backup.clean.cleanSubmitText'),
    // placeholder: '请输入: 确认',
    placeholder:  t('config.backup.clean.pleaseInput'),
    isPending: false
  });

  // "确认"
  const isConfirm: boolean = confirm === t('config.backup.clean.confirm');

  if (!isConfirm) {
    // "您已取消操作"
    showToast(t('config.backup.clean.cancelTip'));
  }

  return isConfirm;
}
</script>

<template>
<!--  title="数据备份 · 清理-->
  <van-cell-group :title="t('config.backup.clean.cleanGroupTitle')">
<!--    title="清空当前"-->
    <van-cell :title="t('config.backup.clean.cleanCurr')" clickable @click="clearCurr" is-link/>

<!--    title="清空所有"-->
    <van-cell :title="t('config.backup.clean.cleanAll')" clickable @click="clearAll" is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>
