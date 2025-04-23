<script setup lang="ts">
import type {ConfigRef} from "@/hooks/useConfig.ts";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  min: {
    type: Number,
    default: 0
  }
});

const modelValue = defineModel<any>({required: true});
</script>

<template>
  <van-cell :title="title">
    <template #right-icon>
      <van-stepper :min="min" v-model="modelValue"/>
    </template>
  </van-cell>
</template>

<style scoped>

</style>
