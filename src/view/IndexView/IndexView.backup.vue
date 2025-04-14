<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";

import {showDatePickerDialog} from "@/dialog/CornDatePickerDialog/utils.js";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.ts";
import {EVENT_SCROLL_TO} from "@/const/mittEvent.js";
import cornMitt from "@/mitt/mitt.ts";
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {isInvalidDate} from "@/utils/index.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.ts";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  // store.generateTestData();

  async function onSubmit(logData) {
    await listRef.value.addEntry(logData);
    listRef.value.toBottom();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

const listRef = ref(null);

const actions = ref([
  {
    name: '滚动到底部',
    callback() {
      if (!listRef.value) return;
      listRef.value.toBottom();
    }
  },
  {
    name: '滚动到日期',
    callback() {
      showDatePickerDialog(onDialogConfirm);
    }
  },
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
</script>

<template>
  <teleport to=".nav-teleport">
    <van-nav-bar
        left-text="日志"
        fixed
        placeholder
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-nav" size="25"/>
      </template>
    </van-nav-bar>
  </teleport>

  <div class="index-view corn-view" ref="indexViewRef">
    <corn-powerful-list v-model="logsCache" ref="listRef" />
    <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="indexViewRef"/>
  </div>
</template>

<style scoped>
</style>