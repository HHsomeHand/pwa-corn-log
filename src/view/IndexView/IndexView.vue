<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";
import {cornMitt} from "@/utils/mitt.js";
import {convertToDate, getDateInfo} from "@/utils/index.js";
import CornTimePickerDialog from "@/dialog/CornTimePickerDialog.vue";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  console.log("clicked");

  // store.generateTestData();

  showPopup.value = true;
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

const showPopup = ref(false);

const themeVars = reactive({
  overlayBackground: 'rgba(0, 0, 0, 0.1)',
});

const textContent = ref("");

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

    <van-config-provider :theme-vars="themeVars">
      <van-popup
          v-model:show="showPopup"
          round
          position="bottom"
          class="popup-item h-[30%] h-auto pt-2"
          teleport="body"
      >
        <template #default>
          <div class="flex pr-3">
            <van-field
                v-model="textContent"
                rows="1"
                autosize
                label="日志"
                type="textarea"
                placeholder="请输入日志内容"
            />
            <van-button class="flex-shrink-0 !m-2" plain type="primary">记录!</van-button>
          </div>
        </template>
      </van-popup>
    </van-config-provider>

    <corn-time-picker-dialog
        v-model:show="showDialog"
        @confirm="onDialogConfirm"
    />


  </div>
</template>

<style scoped>
.popup-item :deep(.van-field__label) {
  width: auto;
  margin-right: 20px;
}
</style>