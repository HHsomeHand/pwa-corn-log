<script setup lang="ts">
import {showActionSheetByArray} from "@/components/CornActionSheet/utils.ts";
import {findKeyByValue} from "@/utils/object.ts";
import {showNumberPopup} from "@/popup/CornNumberPopup/utils.ts";
import type {NumberDialogOption} from "@/popup/CornNumberPopup/types.ts";
import {stringToNumber} from "@/utils/num.ts";

interface Props {
  title?: string;
  mapper?: Record<string, string>;
  inputPlaceholder?: string;
  formatStr?: string;
  minNum?: number;
  maxNum?: number;
  defaultValue?: number; // 当值为字符串的时候, 显示的数值
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  mapper: () => ({}),
  inputPlaceholder: ''
})

const model = defineModel<string | number>({ required: true });

const displayValue = computed(() => {
  return props.mapper[String(model.value)] || String(model.value);
});

async function onClick() {
  const CUSTOM_OPTION = "自定义";

  const result = await showActionSheetByArray([CUSTOM_OPTION, ...Object.values(props.mapper)]);

  // 如 props.mapper 为 { contain: '包含' }, 只用把 key 获取了就 ok
  if (result !== CUSTOM_OPTION) {
    const value = findKeyByValue(props.mapper, result);

    if (value === undefined) {
      console.error("CornCellEnumNumber: 传入的 mapper 有问题");
    } else {
      model.value = value;
    }
  } else {
    // let input = await showInputPopup({
    //   label: props.title,
    //   placeholder: props.inputPlaceholder,
    //   defaultVal: model.value,
    //   submitText: "应用"
    // });

    const result = await showNumberPopup({
      submitText: '确认',
      title: props.title + (props.formatStr ? ` (单位${props.formatStr})` : ""),
      initNum: stringToNumber(model.value, props.defaultValue),
      minNum: props.minNum,
      maxNum: props.maxNum
    });

    if (result !== null) {
      model.value = result;
    }
  }

}
</script>

<template>
  <van-cell :title="title" :value="displayValue" is-link @click="onClick" />
</template>

<style scoped>

</style>