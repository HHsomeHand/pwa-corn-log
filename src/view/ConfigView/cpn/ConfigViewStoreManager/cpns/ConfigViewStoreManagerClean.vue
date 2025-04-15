<script setup lang="ts">

import {showToast} from "vant";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";

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
  <van-cell-group title="数据备份 · 清理">
    <van-cell title="清空当前" clickable @click="clearCurr" is-link/>

    <van-cell title="清空所有" clickable @click="clearAll" is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>