<script lang="ts" setup>
import CornPowerfulList from "@/components/CornPowerfulList/CornPowerfulList.vue";

import {showDatePickerDialog} from "@/dialog/CornDatePickerDialog/utils.js";
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {isInvalidDate} from "@/utils/index.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.ts";
import {useAppStore} from "@/store/app.store.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  }
})

const listRef = useTemplateRef('listRef');

const actions = ref([
  {
    // '滚动到底部'
    name: t('indexBase.scrollToBottom'),
    callback() {
      if (!listRef.value) return;
      listRef.value.toBottom();
    }
  },
  {
    // '滚动到日期'
    name: t('indexBase.scrollToDate'),
    callback() {
      showDatePickerDialog(onDialogConfirm);
    }
  },
  ...props.actions,
]);

function scrollToDate(date) {
  if (!listRef.value) return;
  if (isInvalidDate(date)) {
    throw new Error("错误的日期");
  }

  listRef.value.scrollToDate(date);
}

function onDialogConfirm(selectDate) {
  scrollToDate(selectDate);
}

function onClickRight(event) {
  showActionSheet(actions.value);
}

const router = useRouter();
const route = useRoute();

// 实现读取路由参数, 并跳转到相应的日期
onMounted(() => {
  const route = useRoute();

  const timestamp = Number(route.query.timestamp);

  if (timestamp) {
    scrollToDate(new Date(timestamp));
  }

  clearQueryParams();
})

const clearQueryParams = () => {
  // 使用 router.push 清除 query 参数
  router.replace({
    path: route.path,
    query: {}
  });
}

const logsCache = ref([])

defineExpose({
  listRef,
  logsCache
})

const appStore = useAppStore();

</script>

<template>
  <teleport to=".nav-teleport">
    <van-nav-bar
        :left-text="appStore.currentTitle"
        fixed
        placeholder
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-nav" size="25"/>
      </template>
    </van-nav-bar>
  </teleport>

  <div class="index-view corn-view relative overflow-hidden">
    <corn-powerful-list v-model="logsCache"  ref="listRef">
      <template #bottom>
        <slot name="list-bottom"></slot>
      </template>
    </corn-powerful-list>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
