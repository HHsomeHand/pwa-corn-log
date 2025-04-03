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