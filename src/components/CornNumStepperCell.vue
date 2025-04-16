<script setup lang="ts">
import type {ConfigRef} from "@/hooks/useConfig.ts";

const props = defineProps({
  title: {
    type: String,
    default: ""
  }
});

const modelValue = defineModel<any>({required: true});
</script>

<template>
  <van-cell :title="title">
    <template #right-icon>
      <van-stepper v-model="modelValue"/>
    </template>
  </van-cell>
</template>

<style scoped>

</style>
