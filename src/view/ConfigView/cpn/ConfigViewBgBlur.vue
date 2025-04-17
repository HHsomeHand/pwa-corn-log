<script setup lang="ts">
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const wallpaperStore = useWallpaperStore();

const {
  isBlur,
  cornBackdropPx,
} = storeToRefs(wallpaperStore);
</script>

<template>

  <van-cell-group title="背景图片・毛玻璃特效 (背景色需透明) ">
    <van-cell title="是否启用">
      <template #right-icon>
        <van-checkbox v-model="isBlur"/>
      </template>
    </van-cell>

    <van-cell title="模糊半径">
      <template #right-icon>
        <van-stepper v-model="cornBackdropPx"/>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<style scoped>

</style>
