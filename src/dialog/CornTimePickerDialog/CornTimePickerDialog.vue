<script setup>

import {convertToDate, convertToTime, getDateInfo, getTimeInfo} from "@/utils/index.js";

const showDialog = ref(false);

const currentTimeInfo = getTimeInfo();

const currentTime = ref([]);

function applyTime(newTime) {
  const currentTimeInfo = getTimeInfo(newTime);

  currentTime.value = [
    currentTimeInfo.hour,
    currentTimeInfo.min,
    currentTimeInfo.sec
  ];
}
applyTime(new Date());

let resolveCallback = null;

function onConfirm() {
  showDialog.value = false;

  const selectTime = convertToTime(...currentTime.value);

  resolveCallback?.(selectTime);
}

function onCancel() {
  showDialog.value = false;

  resolveCallback?.(null);
}


defineExpose({
  showDialog: (callback, { date = new Date()}) => {
    applyTime(date);

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
      <van-time-picker
          v-model="currentTime"
          :columns-type="['hour', 'minute', 'second']"
      />
    </template>
  </van-dialog>
</template>

<style scoped>

</style>