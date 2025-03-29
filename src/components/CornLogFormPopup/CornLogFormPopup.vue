<script setup>
const modifyTime = ref(false);

const showPopup = ref(false);

const themeVars = reactive({
  overlayBackground: 'rgba(0, 0, 0, 0.1)',
});

const logContent = ref("");

const commentContent = ref("");

let isClean = false;

let resolveCallback = null;

function onSubmit() {
  showPopup.value = false;

  isClean = true;

  resolveCallback?.({
    log: logContent.value,
    comment: commentContent.value,
  });
}

function onClosed() {
  if (isClean) {
    logContent.value = "";
    commentContent.value = "";
    isClean = false;
  }

  resolveCallback?.(null);
}

defineExpose({
  showPopup: (callback) => {
    showPopup.value = true
    resolveCallback = callback
  }
})
</script>

<template>
  <teleport to="body">
    <van-config-provider :theme-vars="themeVars">
      <van-popup
          closeable
          round
          position="bottom"
          class="popup-item h-[30%] h-auto pt-2"
          @closed="onClosed"
      >
        <template #default>
          <div class="flex flex-col">
            <van-field
                v-model="logContent"
                rows="1"
                autosize
                label="日志"
                type="textarea"
                placeholder="请输入日志内容"
                class="!pr-12"
            />
            <van-field
                v-model="commentContent"
                rows="1"
                autosize
                label="备注"
                type="textarea"
                placeholder="请输入备注内容"
            />
            <van-button
                v-if="modifyTime"
                class="flex-shrink-0 !m-2"
                plain
                type="primary"
                @click="openDatePickerDialog"
            >
              记录!
            </van-button>
            <van-button
                class="flex-shrink-0 !m-2"
                plain
                type="primary"
                @click="onSubmit"
            >
              记录!
            </van-button>
          </div>
        </template>
      </van-popup>
    </van-config-provider>
  </teleport>

</template>

<style scoped>

</style>