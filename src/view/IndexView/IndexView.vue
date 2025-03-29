<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";
import {cornMitt} from "@/utils/mitt.js";
import {convertToDate, getDateInfo} from "@/utils/index.js";
import CornTimePickerDialog from "@/dialog/CornTimePickerDialog.vue";
import CornField from "@/view/IndexView/cpns/CornField.vue";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  console.log("clicked");

  // store.generateTestData();

  showField.value = true;
}

const showActionSheet = ref(false);

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
      showDialog.value = true;
    }
  },
  { name: '选项三' },
]);

cornMitt.on('nav-right-click', (event) => {
  showActionSheet.value = true;
});

const showDialog = ref(false);

function onDialogConfirm(selectDate) {
  if (!listRef.value) return;

  listRef.value.scrollToDate(selectDate);
}

const showField = ref(false);

async function onSubmit(logData) {
  await listRef.value.addEntry(logData);
  listRef.value.toBottom();
}
</script>

<template>
  <div class="index-view" ref="indexViewRef">
    <corn-powerful-list ref="listRef"/>
    <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="indexViewRef"/>

    <van-action-sheet
        v-model:show="showActionSheet"
        :actions="actions"
        close-on-click-action
        teleport="body"
    />

    <corn-time-picker-dialog
        v-model:show="showDialog"
        @confirm="onDialogConfirm"
    />

    <corn-field
      v-model:show="showField"
      @submit="onSubmit"
    />
  </div>
</template>

<style scoped>
</style>