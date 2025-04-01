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
  <div class="corn-log mx-2 mb-1 rounded-lg overflow-hidden">
    <van-cell
        :value="item.log"
    >
      <template #title>
        <template v-if="item.originalDate">
          <p class="inline origin-date-container">
            {{date2str(item.originalDate)}} <CornTimeDisplayer :date="item.originalDate" />
          </p>
          <br/>
        </template>
        {{date2str(item.date)}}
        <CornTimeDisplayer :date="item.date" />
      </template>
    </van-cell>
    <van-notice-bar
        wrapable
        v-if="item.comment"
        :scrollable="false"
        :text="item.comment"
        background="var(--van-primary-color-2)"
    />
  </div>
</template>

<style scoped>
.corn-log {
 --van-notice-bar-text-color: var(--van-primary-color);
}

.origin-date-container {
  position: relative;
}

.origin-date-container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--van-primary-color);
  transform: translateY(-50%);
}
</style>