<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";
import {cornMitt} from "@/utils/mitt.js";
import {showDatePickerDialog} from "@/dialog/CornDatePickerDialog/utils.js";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  // store.generateTestData();

  async function onSubmit(logData) {
    await listRef.value.addEntry(logData);
    listRef.value.toBottom();
  }

  showLogFormPopup(onSubmit, {id: "add"});
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
      showDatePickerDialog(onDialogConfirm);
    }
  },
  { name: '选项三' },
]);

function onDialogConfirm(selectDate) {
  if (!listRef.value) return;

  listRef.value.scrollToDate(selectDate);
}

function onClickRight(event) {
  showActionSheet.value = true;
}
</script>

<template>
  <teleport to=".nav-teleport">
    <van-nav-bar
        left-text="药律"
        fixed
        placeholder
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-nav" size="25"/>
      </template>
    </van-nav-bar>
  </teleport>

  <div class="index-view overflow-y-scroll grow" ref="indexViewRef">
    <corn-powerful-list ref="listRef"/>
    <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="indexViewRef"/>

    <van-action-sheet
        v-model:show="showActionSheet"
        :actions="actions"
        close-on-click-action
        teleport="body"
    />
  </div>
</template>

<style scoped>
</style>