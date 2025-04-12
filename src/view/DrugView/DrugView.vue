<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {fmtDate, getTimeDiff} from "../../utils/index.js";
import TimeGapDivider from "@/view/DrugView/cpns/TimeGapDivider.vue";

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

const lastLogEntry = computed(() => {
  const lastIndex = logsCache.value?.length - 1;

  return logsCache.value?.[lastIndex];
})
</script>

<template>
  <base-index-view store-name="drug" ref="base-index-view-ref">
    <template #list-bottom>
      <time-gap-divider
          v-if="logsCache?.length > 1"
          :target-date="lastLogEntry?.date"
      />
    </template>

    <template #default>
      <corn-floating-bubble @click="onClick" :size="65" :gap-y="12"/>
    </template>
  </base-index-view>
</template>

<style scoped>

</style>