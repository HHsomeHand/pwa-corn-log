<script setup lang="ts">
import {showActionSheetByArray} from "@/components/CornActionSheet/utils.ts";
import {findKeyByValue} from "@/utils/object.ts";
import {showNumberPopup} from "@/popup/CornNumberPopup/utils.ts";
import {stringToNumber} from "@/utils/num.ts";
import cornMitt from "@/mitt/mitt.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

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
  // "自定义"
  const CUSTOM_OPTION = t('cornCellEnumNumber.customOption');

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

    function onNumChange(num: number) {
      model.value = num;
    }

    cornMitt.on("popup:num:change", onNumChange);

    const result = await showNumberPopup({
      // '确认'
      submitText:  t('cornCellEnumNumber.submitText'),
      // title: props.title + (props.formatStr ? ` (单位${props.formatStr})` : ""),
      title: props.title + (props.formatStr ? ` (${t('cornCellEnumNumber.unit')}${props.formatStr})` : ""),
      initNum: stringToNumber(model.value, props.defaultValue),
      minNum: props.minNum,
      maxNum: props.maxNum
    });

    cornMitt.off("popup:num:change", onNumChange);

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
