<script setup>
const props = defineProps({
  submitText: {
    type: String,
    default: '',
  }
})

const isShowPopup = ref(false);

const emits = defineEmits(['submit', 'closed']);

function onSubmit() {
  isShowPopup.value = false;

  emits('submit');
}

function onClosed() {
  emits('closed');
}

defineExpose({
  show() {
    isShowPopup.value = true;
  }
})
</script>

<template>
  <teleport to="body">
    <van-popup
        v-model:show="isShowPopup"
        round
        position="bottom"
        class="h-auto py-2"
        @closed="onClosed"
    >
      <template #default>
        <div class="flex flex-col gap-2">
          <slot/>
          <van-button
              class="!block flex-shrink-0 px-2 popup-btn"
              plain
              type="primary"
              @click="onSubmit"
          >
            {{submitText}}
          </van-button>
        </div>
      </template>
    </van-popup>
  </teleport>

</template>

<style scoped>

</style>