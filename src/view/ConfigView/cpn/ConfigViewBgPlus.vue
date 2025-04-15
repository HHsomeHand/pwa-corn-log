<script setup lang="ts">

import {WALLPAPER_SIZE_MAPPER, WALLPAPER_X_POS, WALLPAPER_Y_POS} from "@/const/wallpaper";
import CornCellEnumNumber from "@/view/ConfigView/cpn/CornCellEnumNumber.vue";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";


const wallpaperStore = useWallpaperStore();

const {
  wallpaperSize,
  wallpaperPosX,
  wallpaperPosY,
} = storeToRefs(wallpaperStore);

</script>

<template>

  <van-cell-group title="背景图片・高级设置">
    <corn-cell-enum-number
        title="背景图片大小"
        :mapper="WALLPAPER_SIZE_MAPPER"
        v-model="wallpaperSize"
        format-str="%"
        :default-value="100"
    />

    <corn-cell-enum-number
        title="背景图片X轴位置"
        :mapper="WALLPAPER_X_POS"
        v-model="wallpaperPosX"
        :min-num="-Infinity"
        format-str="vw"
        :default-value="-10"
    />

    <corn-cell-enum-number
        title="背景图片Y轴位置"
        :mapper="WALLPAPER_Y_POS"
        v-model="wallpaperPosY"
        :min-num="-Infinity"
        format-str="vh"
        :default-value="-10"
    />
  </van-cell-group>
</template>

<style scoped>

</style>