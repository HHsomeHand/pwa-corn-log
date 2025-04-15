<script setup lang="ts">


import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {showToast} from "vant";
import {basicModeNames, useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store";
import {copyToClipboard, downloadString} from "@/utils";
import {showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";

const appStore = useAppStore();

interface StoreInfo {
  storeName: string;
  title: string;
  storeJson: string;
  componentKey: 'LOG' | 'LOVE' | 'DRUG' | 'TREATMENT',
}

async function getStoreJson(storeName: string) {
  const store = useLogStoreFactory(storeName)();

  return store.exportToJson();
}

async function getStoreInfos(): Promise<StoreInfo[]> {
  const storeInfoPromises: Promise<StoreInfo>[] =
      Object.entries(appStore.customAppMode)
      .map(([key, value]) => ({storeName: value.storeName, title: value.title, componentKey: value.componentKey}))
      .map(async (info) => ({...info, storeJson: await getStoreJson(info.storeName)}));

  return await Promise.all(storeInfoPromises);
}

async function importJSON() {
  const importMode: string = await showActionSheetByArrayEx([
    {showText: "从输入", value: 'input'},
    {showText: "从文件", value: 'file'},
  ]);

  let importJson: string = "";

  if (importMode === 'input') {
    importJson = await showInputPopup({
      label: '导入数据',
      placeholder: '',
      submitText: '导入',
    });
  } else {
    // TODO: 实现文件导入
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

const showDialog = ref(false);

const json = ref("");

async function exportJSON() {
  const result: StoreInfo[] = await getStoreInfos();

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

async function clearCurr() {
  if (await getConfirm()) {
    console.log("开始删除");
  }
}

async function clearAll() {
  if (await getConfirm()) {
    console.log("开始删除");
  }
}

async function getConfirm(): Promise<boolean> {
  showToast("您是否确认删除? 此操作不可逆");

  const confirm = await showInputPopup({
    label: '确认',
    submitText: '确认清空',
    placeholder: '请输入: 确认',
    isPending: false
  });

  const isConfirm: boolean = confirm === "确认";

  if (!isConfirm) {
    showToast("您已取消操作");
  }

  return isConfirm;
}
</script>

<template>
  <van-cell-group title="数据备份">
    <van-cell title="导入" clickable @click="importJSON" is-link/>

    <van-cell title="导出" clickable @click="exportJSON" is-link/>

    <van-cell title="清空当前" clickable @click="clearCurr" is-link/>

    <van-cell title="清空所有" clickable @click="clearAll" is-link/>
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