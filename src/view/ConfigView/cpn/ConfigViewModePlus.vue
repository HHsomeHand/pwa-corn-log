<script setup lang="ts">

import {basicModeNames, useAppStore} from "@/store/app.store.ts";
import {showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";
import {showToast} from "vant";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {useI18n} from "vue-i18n";

const appStore = useAppStore();

const {t} = useI18n();

async function onAddBtnClick() {
  const actionArr = Object.entries(appStore.APP_MODE).map(([key, value]) => ({value: value.componentKey, showText: value.title}));

  // "请选择模板"
  showToast(t('config.modePlus.selectTemplateTip'));

  const componentKey = await showActionSheetByArrayEx(actionArr);

  const modeName = await showInputPopup({
    // "模式名"
    label: t('config.modePlus.modeName'),
    placeholder: "",
    // "创建"
    submitText: t('config.modePlus.create')
  });

  if (appStore.addMode(modeName, componentKey)) {
    // "创建成功"
    showToast(t('config.modePlus.createModeSuccessTip'))
  } else {
    // "创建失败, 命名冲突"
    showToast(t('config.modePlus.createModeFailTip'))
  }
}

async function onDeleteBtnClick() {
  const actionArr = Object.entries(appStore.customAppMode)
      .filter(([key, value]) => !basicModeNames.includes(key))
      .map(([key, value]) => ({value: key, showText: value.title}));

  if (actionArr.length <= 0) {
    // "没有可以移除的自定义模式"
    showToast(t('config.modePlus.noModeToRemoveTip'));
    return;
  }

  const modeKey = await showActionSheetByArrayEx(actionArr);

  if (appStore.removeMode(modeKey)) {
    // "删除成功"
    showToast(t('config.modePlus.removeSuccessTip'))
  } else {
    // "删除失败"
    showToast(t('config.modePlus.removeFailTip'))
  }
}
</script>

<template>
<!--  "模式 · 高级设置"-->
  <van-cell-group :title="t('config.modePlus.cellGroupTitle')">
<!--    "添加模式"-->
    <van-cell :title="t('config.modePlus.addModeBtnText')" @click="onAddBtnClick" clickable is-link/>

<!--    "删除模式"-->
    <van-cell :title="t('config.modePlus.deleteModeBtnText')" @click="onDeleteBtnClick" clickable is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>
