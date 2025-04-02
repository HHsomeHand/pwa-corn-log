<script setup>
import PickColors from "vue-pick-colors";

const props = defineProps({
  colors: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ""
  }
});

console.log(props.title);



function getCSSVariableValue(cssVar) {
  // 提取变量名，去掉 'var(' 和 ')'
  const variableName = cssVar.replace(/^var\((--[^)]+)\)$/, '$1');

  // 从 :root 获取变量值
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

  return value;
}

let color = defineModel();

if (!color.value.startsWith('#') && color !== 'transparent') {
  color.value = getRootCSSVariableValue(color.value);
}

function getRootCSSVariableValue(cssVar) {
  const variableName = cssVar.replace(/^var\((--[^)]+)\)$/, '$1');
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
  return value.trim();
}
</script>

<template>
  <van-cell :title="title">
    <template #value>
      <pick-colors v-model:value="color" :colors="[color, ...colors]"/>
    </template>
  </van-cell>
</template>

<style scoped>

</style>