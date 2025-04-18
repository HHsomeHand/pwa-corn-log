<script setup lang="ts">
// 默认展开 fab
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

  isExpandFab.value = true;
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

const primaryColor = "var(--van-primary-color)"
</script>

<template>
  <div class="fab-container absolute bottom-3 right-2">
<!--    <vue-fab-->
<!--        :clickAutoClose="false"-->
<!--        :mainBtnColor="primaryColor"-->
<!--    >-->
<!--      <fab-item-->
<!--          :color="primaryColor"-->
<!--          @clickItem="onAddClick"-->
<!--          title="添加"-->
<!--      />-->

<!--      <fab-item-->
<!--          v-for="log in distinctLogs"-->
<!--          :color="primaryColor"-->
<!--          @clickItem="quickLog(log)"-->
<!--          :title="log"-->
<!--      >-->
<!--        <template>-->
<!--              <span class="fab-container__displayer">-->
<!--              {{ fmtFabIcon(log) }}-->
<!--              </span>-->
<!--        </template>-->
<!--      </fab-item>-->
<!--    </vue-fab>-->
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
