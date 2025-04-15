<script setup lang="ts">

import {useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store";
import {showToast} from "vant";
import {copyToClipboard, downloadString} from "@/utils";

const appStore = useAppStore();

async function getStoreJson(storeName: string) {
  const store = useLogStoreFactory(storeName)();

  return store.exportToJson();
}

async function getCurrStoreInfo(): Promise<StoreInfo[]> {
  const currMode = appStore.currentMode;

  return [{
    ...currMode,
    storeJson: await getStoreJson(currMode.storeName)
  }]
}

async function getStoreInfos(): Promise<StoreInfo[]> {
  const storeInfoPromises: Promise<StoreInfo>[] =
      Object.entries(appStore.customAppMode)
          .map(([key, value]) => ({storeName: value.storeName, title: value.title, componentKey: value.componentKey}))
          .map(async (info) => ({...info, storeJson: await getStoreJson(info.storeName)}));

  return await Promise.all(storeInfoPromises);
}


const showDialog = ref(false);

const json = ref("");

async function exportJson(fnGetInfos: () => Promise<StoreInfo[]>) {
  const result: StoreInfo[] = await fnGetInfos();

  showDialog.value = true;

  try {
    json.value = JSON.stringify(result);
  } catch(e) {
    showToast("发生了未知错误")
  }
}

function copyJson() {
  copyToClipboard(json.value);
}

function downloadJson() {
  downloadString(json.value, 'store.backup.json');
}

</script>

<template>
  <van-cell-group title="数据备份 · 导出">
    <van-cell title="导出当前" clickable @click="exportJson(getCurrStoreInfo)" is-link/>

    <van-cell title="导出全部" clickable @click="exportJson(getStoreInfos)" is-link/>
  </van-cell-group>

  <teleport to="body">
    <van-dialog
        class="json-dialog"
        v-model:show="showDialog"
        title="已经准备好了数据"
        confirmButtonText="结束"
    >
      <div
          class="
            json-dialog__container
            py-2 px-3 pt-3
            flex flex-col items-center gap-2
          "
      >
        <van-button class="w-full" plain type="primary" @click="copyJson">复制到剪切板</van-button>

        <van-button class="w-full" plain type="primary" @click="downloadJson">导出为文件</van-button>
      </div>

    </van-dialog>
  </teleport>
</template>

<style scoped>

</style>