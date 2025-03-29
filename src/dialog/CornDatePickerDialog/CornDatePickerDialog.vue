<script setup>

import {convertToDate, getDateInfo} from "@/utils/index.js";

const showDialog = ref(false);

const currentDateInfo = getDateInfo();

const currentDate = ref([
  currentDateInfo.year,
  currentDateInfo.month,
  currentDateInfo.date
]);

let resolveCallback = null;

function onConfirm() {
  showDialog.value = false;

  const selectDate = convertToDate(...currentDate.value);

  resolveCallback?.(selectDate);
}

function onCancel() {
  showDialog.value = false;

  resolveCallback?.(null);
}

defineExpose({
  showDialog: (callback) => {
    showDialog.value = true
    resolveCallback = callback
  }
})
</script>

<template>
  <van-dialog
      title="选择时间"
      :show="showDialog"
      @confirm="onConfirm"
      @cancel="onCancel"
      :showCancelButton="true"
  >
    <template #default>
      <van-date-picker
          v-model="currentDate"
          type="time"
      />
    </template>
  </van-dialog>
</template>

<style scoped>

</style>