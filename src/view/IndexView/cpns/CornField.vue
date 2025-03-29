<script setup>

const showPopup = defineModel("show");

const themeVars = reactive({
  overlayBackground: 'rgba(0, 0, 0, 0.1)',
});

const logContent = ref("");

const commentContent = ref("");

const emits = defineEmits(["submit"]);

let isClean = false;

function onSubmit() {
  emits("submit", {
    log: logContent.value,
    comment: commentContent.value,
  });

  showPopup.value = false;

  isClean = true;
}

function onClosed() {
  if (isClean) {
    logContent.value = "";
    commentContent.value = "";
    isClean = false;
  }
}
</script>

<template>
  <teleport to="body">
    <van-config-provider :theme-vars="themeVars">
      <van-popup
          v-model:show="showPopup"
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