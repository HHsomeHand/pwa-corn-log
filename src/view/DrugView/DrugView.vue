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

// 默认展开 fab
const isExpandFab = ref(true);
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
      <div class="fab-container absolute bottom-3 right-3">
        <q-fab v-model="isExpandFab" color="primary" push icon="keyboard_arrow_right" direction="up">
          <q-fab-action color="primary" @click="onClick" icon="add" />
          <q-fab-action color="primary" @click="onClick" icon="alarm" />
        </q-fab>
      </div>

    </template>
  </base-index-view>
</template>

<style scoped>
@import "tailwindcss";

.fab-container :deep(.q-fab__actions a) {
  @apply w-13 h-13 p-3
}
</style>