<script setup lang="ts">
import {showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {getStringFromFile} from "@/utils";
import {useLogStoreFactory} from "@/store/logs.store";
import {showToast} from "vant";
import type {StoreInfo} from "@/view/ConfigView/cpn/ConfigViewStoreManager/types";
import {useAppStore} from "@/store/app.store.ts";
import {useI18n} from "vue-i18n";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

const appStore = useAppStore();

const {t} = useScopedI18n('config.backup.import');

async function importJson() {
  const importMode: string = await showActionSheetByArrayEx([
      // {showText: "从输入", value: 'input'},
    {showText: t("fromText"), value: 'input'},
      // {showText: "从文件", value: 'file'},
    {showText: t("fromFile"), value: 'file'},
  ]);

  let importJson: string = "";

  if (importMode === 'input') {
    importJson = await showInputPopup({
      // label: '导入数据',
      label: t("inputLabel"),
      placeholder: '',
      // submitText: '导入',
      submitText: t("submitText"),
    });
  } else {
    importJson = await getStringFromFile();
  }

  let importData: StoreInfo[] = [];

  try {
    importData = JSON.parse(importJson);

    const basicStoreName = Object.entries(appStore.appModeEntryMap).map(([key, value]) => value.storeName);

    for (let info of importData) {
      if (!basicStoreName.includes(info.storeName)) {
        appStore.addMode(info.storeName, info.componentKey);
      }

      const logStore = useLogStoreFactory(info.storeName)();

      await logStore.importFromJson(info.storeJson);
    }
  } catch (parseError) {
    showToast("错误的 JSON 格式");
  }
}

</script>

<template>
<!--
  <van-cell-group title="数据备份 · 导入">
-->
  <van-cell-group :title="t('cellGroupTitle')">
<!--
    <van-cell title="导入" clickable @click="importJson" is-link/>
-->
    <van-cell :title="t('importCellText')" clickable @click="importJson" is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>
