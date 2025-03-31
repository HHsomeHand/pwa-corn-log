<script setup>

import {convertToDate, getDateInfo} from "@/utils/index.js";

const showDialog = ref(false);

const currentDate = ref([]);

function applyDate(newDate) {
  const currentDateInfo = getDateInfo(newDate);

  currentDate.value = [
    currentDateInfo.year,
    currentDateInfo.month,
    currentDateInfo.date
  ];
}
applyDate(new Date());

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

let maxDate = ref(new Date());

defineExpose({
  showDialog: (callback, {isMaxToday = true, date = new Date()}) => {
    if (isMaxToday) {
      maxDate.value = new Date();
    }
    applyDate(date);
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
          :max-date="maxDate"
      />
    </template>
  </van-dialog>
</template>

<style scoped>

</style>