<script setup>

import {convertToDate, getDateInfo} from "@/utils/index.js";

const showDialog = defineModel('show');

const currentDateInfo = getDateInfo();

const currentDate = ref([
  currentDateInfo.year,
  currentDateInfo.month,
  currentDateInfo.date
]);

const emits = defineEmits(["confirm"]);

function onConfirm() {
  showDialog.value = false;

  const selectDate = convertToDate(...currentDate.value);

  emits("confirm", selectDate);
}

function onCancel() {
  showDialog.value = false;
}
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