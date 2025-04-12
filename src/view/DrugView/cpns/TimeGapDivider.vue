<script setup>
import {getTimeDiff} from "@/utils/index.js";

const props = defineProps({
  targetDate: {
    type: Object,
    default: () => new Date(),
  }
})

const currentDate = ref(new Date());

// 更新时间
setInterval(() => {
  currentDate.value = new Date();
}, 60 * 1000);

const timeGap = computed(() => {
  const { days, hours, minutes } = getTimeDiff(
      props.targetDate,
      currentDate.value
  );

  function _fmtStr(num, fmt) {
    return (num > 0 ? ` ${num} ${fmt}` : "")
  }

  return '距离上次服药约' +
      // (days > 0 ? ` ${days} 天` : "") +
      _fmtStr(days, '天') +
      // (hours > 0 ? ` ${hours} 小时` : "") +
      _fmtStr(hours, '小时') +
      // (minutes > 0 ? ` ${minutes} 分钟` : "")
      _fmtStr(minutes, '分钟')
})
</script>

<template>
  <van-divider>{{timeGap}}</van-divider>
</template>

<style scoped>

</style>