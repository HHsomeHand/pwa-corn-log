<script setup lang="ts">

import {basicModeNames, useAppStore} from "@/store/app.store.ts";
import {showActionSheetByArray, showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";
import {showToast} from "vant";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {storeToRefs} from "pinia";

const appStore = useAppStore();

async function onAddBtnClick() {
  const actionArr = Object.entries(appStore.APP_MODE).map(([key, value]) => ({value: value.componentKey, showText: value.title}));

  showToast("请选择模板");

  const componentKey = await showActionSheetByArrayEx(actionArr);

  const modeName = await showInputPopup({
    label: "模式名",
    placeholder: "",
    submitText: "创建"
  });

  if (appStore.addMode(modeName, componentKey)) {
    showToast("创建成功")
  } else {
    showToast("创建失败, 命名冲突")
  }
}

async function onDeleteBtnClick() {
  const actionArr = Object.entries(appStore.customAppMode)
      .filter(([key, value]) => !basicModeNames.includes(key))
      .map(([key, value]) => ({value: key, showText: value.title}));

  if (actionArr.length <= 0) {
    showToast("没有可以移除的自定义模式");
    return;
  }

  const modeKey = await showActionSheetByArrayEx(actionArr);

  if (appStore.removeMode(modeKey)) {
    showToast("删除成功")
  } else {
    showToast("删除失败")
  }
}
</script>

<template>
  <van-cell-group title="模式 · 高级设置">
    <van-cell title="添加模式" @click="onAddBtnClick" clickable is-link/>
    <van-cell title="删除模式" @click="onDeleteBtnClick" clickable is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>