<script setup lang="ts">
import CornPopup from "@/popup/CornPopup/CornPopup.vue";
import type {NumberDialogOption} from "@/popup/CornNumberPopup/types.ts";

let resolveCallback: Function | null = null;

const popupRef = useTemplateRef("popup-ref");

function onSubmit() {
  resolveCallback?.(num.value);
}

function onClosed() {
  resolveCallback?.(null);
}

const submitText = ref("");

const num = ref(0);
const maxNum = ref<Number | null>(null);
const minNum = ref<Number | null>(null);

defineExpose({
  showPopup: (callback: Function, {
      initNum = 0,
      submitText: _submitText = "",
      maxNum: _maxNum = null,
      minNum: _minNum = null,
  }: NumberDialogOption = {}) => {
    if (popupRef.value === null) {
      return ;
    }

    popupRef.value.show();

    num.value = initNum;
    submitText.value = _submitText;
    maxNum.value = _maxNum;
    minNum.value = _minNum;

    resolveCallback = callback
  }
})
</script>

<template>
  <corn-popup
      ref="popup-ref"
      @closed="onClosed"
      @submit="onSubmit"
      :submit-text="submitText"
  >

  </corn-popup>

</template>

<style scoped>

</style>