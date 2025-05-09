<script lang="ts" setup>

import CornTimeDisplayer from "@/components/CornTimeDisplayer.vue";
import {fmtDate, isSameDay} from "@/utils/index.js";
import {useStyleStore} from "@/store/style.store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
    }
  }
})

const {t} = useI18n();

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
    // '今天'
    result.value = t('cornLog.today');

    checkDate()
  } else if (isSameDay(date, yesterday)) {
    // '昨天'
    result.value = t('cornLog.yesterday');

    checkDate()
  }

  return result;
}

const emits = defineEmits(["delete"]);

function onDelete() {
  emits("delete", props.item);
}

const styleStore = useStyleStore();

const {
  cornLogSpaceHeight,
  isAlwaysShowComment,
  cornLogMarginBottom
} = storeToRefs(styleStore);

</script>

<template>
  <div class="corn-log mx-2 mb-1 rounded-lg overflow-hidden">
    <van-swipe-cell>
      <van-cell
          :value="item.log"
          clickable
      >
        <template #title>
          <div class="corn-log__container my-flex flex-col gap-2">
            <div
                v-if="item.originalDate"
                class="inline origin-date-container corn-log__time-displayer"
            >
              <span class="corn-log__date-displayer">
                {{ date2str(item.originalDate) }}
              </span>

              <CornTimeDisplayer :date="item.originalDate"/>
            </div>

            <div class="corn-log__time-displayer">
              <span class="corn-log__date-displayer">
                {{ date2str(item.date) }}
              </span>

              <CornTimeDisplayer :date="item.date"/>
            </div>
          </div>
          <corn-space :height="cornLogSpaceHeight"/>
        </template>
      </van-cell>

      <template #right>
        <van-button @click="onDelete" square text="删除" type="danger" class="delete-button !h-full"/>
      </template>
    </van-swipe-cell>

    <van-notice-bar
        class="min-h-[var(--corn-log-empty-comment-min-height)] rounded-b-lg overflow-hidden"
        wrapable
        v-if="item.comment || isAlwaysShowComment"
        :scrollable="false"
        background="var(--van-primary-color-2)"
    >
      {{ item.comment }}
    </van-notice-bar>

    <corn-space :height="cornLogMarginBottom"/>
  </div>
</template>

<style scoped>
.corn-log {
  --van-notice-bar-text-color: var(--van-primary-color);
}

.corn-log__date-displayer {
  min-width: var(--corn-log-time-date-min-width);
}

.corn-log__time-displayer {
  @apply flex items-center;
  gap: 5px;
  white-space: nowrap;
}

/* 删除线 */
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
