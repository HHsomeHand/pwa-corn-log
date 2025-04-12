<script setup lang="ts">
// 默认展开 fab
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {LogStoreKey} from "@/injectionKeys.ts";
import cornMitt from "@/mitt/mitt.ts";

const isExpandFab = ref(true);

const emits = defineEmits(['quickLog', 'addClick'])

let logStore = inject(LogStoreKey);

const distinctLogs = ref([]);

async function updateDistinctLogs() {
  distinctLogs.value = await logStore.getDistinctLogs();
}

updateDistinctLogs();

cornMitt.on("list:update", updateDistinctLogs);
cornMitt.on("list:delete", updateDistinctLogs);
cornMitt.on("list:add", updateDistinctLogs);

function quickLog(log) {
  emits('quickLog', log);

  isExpandFab.value = true;
}

function onAddClick() {
  emits('addClick');
}

function fmtFabIcon(str: string) {
  if (str.length === 0) {
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