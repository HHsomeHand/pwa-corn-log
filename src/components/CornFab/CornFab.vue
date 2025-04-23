<script setup lang="ts">
// 默认展开 fab
import {LogStoreKey} from "@/injectionKeys.ts";
import cornMitt from "@/mitt/mitt.ts";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

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

function onMainBtnClick() {
  isExpandFab.value = !isExpandFab.value;
}

const {t} = useScopedI18n('fab')
</script>

<template>
  <div class="fab-container absolute bottom-3 right-2">
<!--    一整个的 FAB-->
    <div
        class="corn-fab"
    >
      <transition name="fade">
        <div v-if="isExpandFab" class="corn-fab__container">
          <div
              class="corn-fab__fab-item"
          >
<!--            添加-->
            <div class="fab-item__label">
              {{t('addBtnText')}}
            </div>

            <div
                class="fab__button fab-item__button"
                @click="onAddClick"
            >
              <van-icon class="add-icon-font-size" name="plus" />

            </div>
          </div>

          <div
              class="corn-fab__fab-item"
              v-for="log in distinctLogs"
          >
            <div class="fab-item__label">
              {{log}}
            </div>

            <div
                class="fab__button fab-item__button"
                @click="quickLog(log)"
            >
           <span class="fab-container__displayer">
              {{ fmtFabIcon(log) }}
           </span>
            </div>

          </div>
        </div>
      </transition>

<!--      大按钮-->
      <van-button
          type="primary"
          class="fab__button corn-fab__button"
          @click="onMainBtnClick"
      >
          <van-icon class="ellipsis-icon-font-size" name="ellipsis" />
      </van-button>
    </div>
  </div>
</template>

<style scoped>

@import "tailwindcss";

.ellipsis-icon-font-size {
  font-size: calc(var(--van-font-size-lg) * 1.75);
}

.add-icon-font-size {
  font-size: calc(var(--van-font-size-lg) * 1.25);
}

.corn-fab__container {
  @apply flex flex-col gap-2;

  margin-bottom: 5px;

  transform-origin: bottom;
}

.fade-enter-active, .fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  transform: translateY(20px) scale(0);
  opacity: 0;
}

/* fab 按钮的基础样式 */
.fab__button {
  background-color: var(--van-primary-color);
  @apply w-15 h-15 flex justify-center items-center rounded-full text-gray-100
}

/* fab 大按钮 */
.corn-fab__button {
  background-color: var(--van-primary-color);
  @apply p-1
}

.corn-fab__fab-item {
  position: relative;
}

/* fab 小按钮 */
.fab-item__button {
}

/* fab 标签 */
.fab-item__label {
  position: absolute;

  /* 不换行 */
  white-space: nowrap;

  /* 距顶 父元素高度 50% */
  top: 50%;

  transform: translateY(-50%) translateX(calc(-100% - 5px));


  font-size: var(--van-font-size-md);

  @apply bg-gray-500/80 text-gray-50 px-2 py-1 rounded-lg;
}

.fab-container__displayer {
  font-size: var(--van-font-size-lg)
}
</style>
