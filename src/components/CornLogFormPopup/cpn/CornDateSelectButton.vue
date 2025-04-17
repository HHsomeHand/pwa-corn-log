<script setup>
import {fmtDate} from "../../../utils/index.js";
import {showDatePickerDialog} from "@/dialog/CornDatePickerDialog/utils.js";
import {showTimePickerDialog} from "@/dialog/CornTimePickerDialog/utils.js";
import {useI18n} from "vue-i18n";

const date= defineModel();

function applyYMDToDate(ymdDate, date) {
  if (!(ymdDate instanceof Date) || !(date instanceof Date)) {
    throw new Error("Invalid date");
  }
  date.setFullYear(ymdDate.getFullYear(), ymdDate.getMonth(), ymdDate.getDate());
  return date;
}

function applyHMSToDate(hmsDate, date) {
  if (!(hmsDate instanceof Date) || !(date instanceof Date)) {
    throw new Error("Invalid date");
  }
  date.setHours(hmsDate.getHours(), hmsDate.getMinutes(), hmsDate.getSeconds(), hmsDate.getMilliseconds());
  return date;
}

const YMDDate = ref(new Date(date.value));

onMounted(() => {
  watch(YMDDate, () => applyYMDToDate(YMDDate.value, date.value));
})

const HMSDate = ref(new Date(date.value))

onMounted(() => {
  watch(HMSDate, () => applyHMSToDate(HMSDate.value, date.value));
})

function onYMDClick() {
  // store.generateTestData();

  function onDialogConfirm(newDate) {
    YMDDate.value = newDate;
  }

  showDatePickerDialog(onDialogConfirm, {date: YMDDate.value});
}


function onHMSClick() {
  function onDialogConfirm(newTime) {
    HMSDate.value = newTime;
  }

  showTimePickerDialog(onDialogConfirm, {date: YMDDate.value});
}

const {t} = useI18n();
</script>

<template>
  <van-button
      class="popup-btn"
      plain
      type="primary"
      @click="onYMDClick"
  >
    {{t('cornDateSelectButton.dateSelect')}} {{fmtDate(YMDDate, "YYYY/MM/DD")}}
  </van-button>

  <van-button
      class="popup-btn"
      plain
      type="primary"
      @click="onHMSClick"
  >
    {{t('cornDateSelectButton.timeSelect')}} {{fmtDate(HMSDate, "HH:mm:ss")}}
  </van-button>
</template>

<style scoped>

</style>
