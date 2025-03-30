<script setup>
import {fmtDate} from "../../../utils/index.js";

const date= defineModel();


</script>

<template>
  <van-button
      class="popup-btn"
      plain
      type="primary"
  >
    日期选择 {{fmtDate(date, "YYYY/MM/DD")}}
  </van-button>

  <van-button
      class="popup-btn"
      plain
      type="primary"
  >
    时间选择 {{fmtDate(date, "HH:mm:ss")}}
  </van-button>
</template>

<style scoped>

</style>