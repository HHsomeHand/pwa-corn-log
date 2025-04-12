<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {fmtDate, getTimeDiff} from "../../utils/index.js";

const baseIndexViewRef = useTemplateRef("base-index-view-ref");

const logsCache = computed(() => baseIndexViewRef.value?.logsCache);

const listRef = computed(() => baseIndexViewRef.value?.listRef);

function onClick() {
  async function onSubmit(logData) {
    await listRef.value?.addEntry?.(logData);
    listRef.value?.toBottom?.();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

const currentDate = ref(new Date());

// 更新时间
setInterval(() => {
  currentDate.value = new Date();
}, 60 * 1000);

const timeGap = computed(() => {
  const lastIndex = logsCache.value?.length - 1;

  const { days, hours, minutes } = getTimeDiff(
      logsCache.value?.[lastIndex]?.date,
      currentDate.value
  );

  console.log(days, hours, minutes)

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
  <base-index-view store-name="drug" ref="base-index-view-ref">
    <template #list-bottom>
      <div v-if="logsCache?.length > 1">
        <van-divider>{{timeGap}}</van-divider>
      </div>
    </template>

    <template #default>
      <corn-floating-bubble @click="onClick" :size="65" :gap-y="12"/>
    </template>
  </base-index-view>
</template>

<style scoped>

</style>