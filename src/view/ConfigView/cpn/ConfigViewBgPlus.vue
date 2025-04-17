<script setup lang="ts">

import {WALLPAPER_SIZE_MAPPER, WALLPAPER_X_POS, WALLPAPER_Y_POS} from "@/const/wallpaper";
import CornCellEnumNumber from "@/components/CornCellEnumNumber.vue";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";


const wallpaperStore = useWallpaperStore();

const {
  wallpaperSize,
  wallpaperPosX,
  wallpaperPosY,
} = storeToRefs(wallpaperStore);

const {t} = useI18n();
</script>

<template>

<!--
  <van-cell-group title="背景图片・高级设置">
-->
  <van-cell-group :title="t('config.bgPlus.cellGroupTitle')">
<!--
    <corn-cell-enum-number
        title="背景图片大小"
-->
    <corn-cell-enum-number
        :title="t('config.bgPlus.bgSize')"
        :mapper="WALLPAPER_SIZE_MAPPER"
        v-model="wallpaperSize"
        format-str="%"
        :default-value="100"
    />

<!--
    <corn-cell-enum-number
        title="背景图片X轴位置"
-->
    <corn-cell-enum-number
        :title="t('config.bgPlus.xPos')"
        :mapper="WALLPAPER_X_POS"
        v-model="wallpaperPosX"
        :min-num="-Infinity"
        format-str="vw"
        :default-value="-10"
    />

<!--
    <corn-cell-enum-number
        title="背景图片Y轴位置"
-->
    <corn-cell-enum-number
        :title="t('config.bgPlus.yPos')"
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
