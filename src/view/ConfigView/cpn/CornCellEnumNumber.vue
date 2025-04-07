<script setup lang="ts">
import {showActionSheetByArray} from "@/components/CornActionSheet/utils.ts";
import {findKeyByValue} from "@/utils/object.ts";
import {showNumberPopup} from "@/popup/CornNumberPopup/utils.ts";
import type {NumberDialogOption} from "@/popup/CornNumberPopup/types.ts";

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // english -> chinese
  mapper: {
    type: Object,
    default: () => {}
  },
  inputPlaceholder: {
    type: String,
    default: "",
  }
})

const model = defineModel<string>();

const displayValue = computed(() => {
  return props.mapper[String(model.value)] || String(model.value);
});

async function onClick() {
  const CUSTOM_OPTION = "自定义";

  const result = await showActionSheetByArray([CUSTOM_OPTION, ...Object.values(props.mapper)]);

  // 如 props.mapper 为 { contain: '包含' }, 只用把 key 获取了就 ok
  if (result !== CUSTOM_OPTION) {
    model.value = findKeyByValue(props.mapper, result);
  } else {
    // let input = await showInputPopup({
    //   label: props.title,
    //   placeholder: props.inputPlaceholder,
    //   defaultVal: model.value,
    //   submitText: "应用"
    // });

    const result = await showNumberPopup({
      submitText: '确认'
    });

    console.log(result);
  }

}
</script>

<template>
  <van-cell :title="title" :value="displayValue" is-link @click="onClick" />
</template>

<style scoped>

</style>