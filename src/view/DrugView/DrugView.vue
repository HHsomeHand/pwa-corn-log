<script setup>
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import TimeGapDivider from "@/view/DrugView/cpns/TimeGapDivider.vue";
import CornFab from "@/components/CornFab/CornFab.vue";

const baseIndexViewRef = useTemplateRef("base-index-view-ref");

const logsCache = computed(() => baseIndexViewRef.value?.logsCache ?? []);

const listRef = computed(() => {
  return baseIndexViewRef.value?.listRef;
});

function onAddClick() {
  async function onSubmit(logData) {
    await listRef.value?.addEntry?.(logData);
    listRef.value?.toBottom?.();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

async function quickLog(log) {
  await listRef.value?.addEntry?.({log});

  listRef.value?.toBottom?.();
}

const lastLogEntry = computed(() => {
  const lastIndex = logsCache.value?.length - 1;

  return logsCache.value?.[lastIndex];
})

</script>

<template>
  <base-index-view ref="base-index-view-ref">
    <template #list-bottom>
      <time-gap-divider
          v-if="logsCache?.length > 1"
          :target-date="lastLogEntry?.date"
      />
    </template>

    <template #default>
      <corn-fab @quick-log="quickLog" @add-click="onAddClick" />
    </template>
  </base-index-view>
</template>

<style scoped>
</style>