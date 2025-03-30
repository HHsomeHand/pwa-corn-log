<script setup>

import CornTimeDisplayer from "@/components/CornTimeDisplayer.vue";
import {fmtDate, isSameDay} from "@/utils/index.js";

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

// 将日期转为今天, 明天
function date2str(date) {
  if (!(date instanceof Date)) return "日期格式错误";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  let result = ref(fmtDate(date, "MM-DD"));

  function checkDate() {
    setTimeout(() => {
      result.value = date2str(date);
    }, 1000 * 60 * 10);
  }

  if (isSameDay(date, today)) {
    result.value = "今天";
    checkDate()
  } else if (isSameDay(date, yesterday)) {
    result.value = "昨天";
    checkDate()
  }

  return result;
}
</script>

<template>
  <div class="mx-2 mb-1 rounded-lg overflow-hidden">
    <van-cell
        :value="item.log"
    >
      <template #title>
        {{date2str(item.date)}}
        <CornTimeDisplayer :date="item.date" />
      </template>
    </van-cell>
    <van-notice-bar
        wrapable
        v-if="item.comment"
        :scrollable="false"
        :text="item.comment"
    />
  </div>
</template>

<style scoped>

</style>