<script setup lang="ts">
import {useStyleStore} from "@/store/style.store.ts";
import {storeToRefs} from "pinia";

const styleStore = useStyleStore();

const {cornLogSpaceHeight} = storeToRefs(styleStore);
</script>

<template>
  <van-cell-group title="日志样式">
    <van-cell title="日志条目增高">
      <template #right-icon>
        <van-stepper :min="0" v-model="cornLogSpaceHeight"/>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<style scoped>

</style>
