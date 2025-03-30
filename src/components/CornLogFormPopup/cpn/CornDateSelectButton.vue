<script setup>
import {fmtDate, stripTime} from "../../../utils/index.js";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {showDatePickerDialog} from "@/dialog/CornDatePickerDialog/utils.js";

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

// const HMSDate = ref(new Date(date.value))
//
// watch(HMSDate, () => applyHMSToDate(HMSDate.value, date.value));

function onYMDClick() {
  // store.generateTestData();

  function onDialogConfirm(newDate) {
    console.log("触发");
    YMDDate.value = newDate;
    console.log(fmtDate(YMDDate.value));
  }

  showDatePickerDialog(onDialogConfirm);
}

</script>

<template>
  <van-button
      class="popup-btn"
      plain
      type="primary"
      @click="onYMDClick"
  >
    日期选择 {{fmtDate(YMDDate, "YYYY/MM/DD")}}
  </van-button>

<!--  <van-button-->
<!--      :key="YMDDate.getTime()"-->
<!--      class="popup-btn"-->
<!--      plain-->
<!--      type="primary"-->
<!--  >-->
<!--    时间选择 {{fmtDate(HMSDate.value, "HH:mm:ss")}}-->
<!--  </van-button>-->
</template>

<style scoped>

</style>