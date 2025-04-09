<script setup lang="ts">
import CornPopup from "@/popup/CornPopup/CornPopup.vue";
import type {NumberDialogOption, NumberPopup} from "@/popup/CornNumberPopup/types.ts";

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
const maxNum = ref<number | undefined>(undefined);
const minNum = ref<number | undefined>(undefined);

const title = ref("");

defineExpose<NumberPopup>({
  // 返回 promise
  // 用户关闭为 null
  // 用户点击提交, 为提交后的值
  showPopup({
              initNum = 0,
              submitText: _submitText = "",
              maxNum: _maxNum = undefined,
              minNum: _minNum = undefined,
              title: _title = "测试title"
            }: NumberDialogOption = {} as any)
  : Promise<number> {
    popupRef.value.show();

    num.value = initNum;
    submitText.value = _submitText;
    maxNum.value = _maxNum;
    minNum.value = _minNum;
    title.value = _title;

    return new Promise(resolve => {
      resolveCallback = resolve
    });
  }
});
</script>

<template>
  <corn-popup
      ref="popup-ref"
      @closed="onClosed"
      @submit="onSubmit"
      :submit-text="submitText"
  >
    <van-cell :title="title">
      <template #right-icon>
        <van-stepper
            :min="minNum"
            :max="maxNum"
            v-model="num"
        />
      </template>
    </van-cell>
  </corn-popup>

</template>

<style scoped>

</style>