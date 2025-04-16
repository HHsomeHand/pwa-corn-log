<script setup lang="ts">

import CornCellColorPicker from "@/components/CornCellColorPicker.vue";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";


const wallpaperStore = useWallpaperStore();

const {
  vantTextColor,
  vantTextColor2,
  vantTextColor3,
  cornTextStrokeWidth,
  cornTextStrokeColor,
  cornStrokeMultiple,
} = storeToRefs(wallpaperStore);

</script>

<template>


  <van-cell-group title="文字颜色">
    <corn-cell-color-picker title="文字颜色1" v-model="vantTextColor"/>
    <corn-cell-color-picker title="文字颜色2" v-model="vantTextColor2"/>
    <corn-cell-color-picker title="文字颜色3" v-model="vantTextColor3"/>
  </van-cell-group>

  <van-cell-group title="文字包边">
    <van-cell title="包边大小">
      <template #right-icon>
        <van-stepper :min="0" v-model="cornTextStrokeWidth"/>
      </template>
    </van-cell>

    <corn-cell-color-picker title="文字包边颜色" v-model="cornTextStrokeColor"/>

    <van-cell title="包边乘积">
      <template #right-icon>
        <van-stepper v-model="cornStrokeMultiple"/>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>

</style>
