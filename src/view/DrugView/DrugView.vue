<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {fmtDate, getTimeDiff} from "../../utils/index.js";
import TimeGapDivider from "@/view/DrugView/cpns/TimeGapDivider.vue";
import {LogStoreKey} from "@/injectionKeys.js";

const baseIndexViewRef = useTemplateRef("base-index-view-ref");

const logsCache = computed(() => baseIndexViewRef.value?.logsCache ?? []);

const listRef = computed(() => {
  return baseIndexViewRef.value?.listRef;
});

let logStore = inject(LogStoreKey);

const distinctLogs = ref([]);

async function updateDistinctLogs() {
  distinctLogs.value = await logStore.getDistinctLogs();
}

updateDistinctLogs();

function onAddClick() {
  async function onSubmit(logData) {
    await listRef.value?.addEntry?.(logData);
    listRef.value?.toBottom?.();

    await updateDistinctLogs();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

function quickLog(log) {
  listRef.value?.addEntry?.({log});

  isExpandFab.value = true;
}

const lastLogEntry = computed(() => {
  const lastIndex = logsCache.value?.length - 1;

  return logsCache.value?.[lastIndex];
})

// 默认展开 fab
const isExpandFab = ref(true);

function fmtFabIcon(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  const firstChar = str[0];

  // 如果第一个字符为英文, 转大写
  if (/[a-z]/.test(firstChar)) {
    return firstChar.toUpperCase();
  }
  return firstChar;
}
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
      <div class="fab-container absolute bottom-3 right-2">
        <q-fab
            v-model="isExpandFab"
            color="primary"
            push
            icon="keyboard_arrow_up"
            direction="up"
        >
          <q-fab-action
              label-position="left"
              external-label
              color="primary"
              @click="onAddClick"
              icon="add"
              label="添加"
          />

          <q-fab-action
              v-for="log in distinctLogs"
              label-position="left"
              external-label
              color="primary"
              @click="quickLog(log)"
              :label="log"
          >
            <template #icon>
              <span class="fab-container__displayer">
              {{ fmtFabIcon(log) }}
              </span>
            </template>
          </q-fab-action>
        </q-fab>
      </div>

    </template>
  </base-index-view>
</template>

<style scoped>
@import "tailwindcss";

/* fab 小按钮 */
.fab-container :deep(.q-fab__actions a) {
  @apply w-15 h-15 flex justify-center items-center rounded-full
}

/* fab 大按钮 */
.fab-container :deep(.q-btn__content) {
  @apply p-1
}

/* fab 大按钮的弧度 */
:deep(.q-fab a.q-btn) {
  @apply rounded-full
}

/* fab 文字大小 */
.fab-container :deep(.q-fab__label) {
  font-size: var(--van-font-size-md)
}

.fab-container__displayer {
  font-size: var(--van-font-size-lg)
}
</style>