<script setup lang="ts">

import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

const props = defineProps({
  title: {
    type: String,
    default: ""
  }
});

const booleanValue = defineModel();

const {t} = useScopedI18n('enable');

const statusText = computed(() => {
  // "启用" : "停用"
  return booleanValue.value ? t('enable') : t('disable');
})

function toggle() {
  booleanValue.value = !booleanValue.value;
}
</script>

<template>
  <van-cell :title="title" :value="statusText" clickable @click="toggle"/>
</template>

<style scoped>

</style>
