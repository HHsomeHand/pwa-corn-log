<script setup lang="ts">

import CornCellColorPicker from "@/components/CornCellColorPicker.vue";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";


const wallpaperStore = useWallpaperStore();

const {
  vantTextColor,
  vantTextColor2,
  vantTextColor3,
  cornTextStrokeWidth,
  cornTextStrokeColor,
  cornStrokeMultiple,
} = storeToRefs(wallpaperStore);

const {t} = useI18n();
</script>

<template>
<!--  title="文字颜色"-->
  <van-cell-group :title="t('config.text.textColorGroupTitle')">
<!--    title="文字颜色1"-->
    <corn-cell-color-picker :title="t('config.text.textColor1')" v-model="vantTextColor"/>

<!--    title="文字颜色2"-->
    <corn-cell-color-picker :title="t('config.text.textColor2')" v-model="vantTextColor2"/>

<!--    title="文字颜色3"-->
    <corn-cell-color-picker :title="t('config.text.textColor3')" v-model="vantTextColor3"/>
  </van-cell-group>

<!--   title="文字包边"-->
  <van-cell-group :title="t('config.text.textStrokeGroupTitle')">
<!--    title="包边大小"-->
    <van-cell :title="t('config.text.textStrokeSize')">
      <template #right-icon>
        <van-stepper :min="0" v-model="cornTextStrokeWidth"/>
      </template>
    </van-cell>

<!--    title="文字包边颜色"-->
    <corn-cell-color-picker :title="t('config.text.textStrokeColor')" v-model="cornTextStrokeColor"/>

<!--    title="包边乘积"-->
    <van-cell :title="t('config.text.textStrokeMultiple')">
      <template #right-icon>
        <van-stepper v-model="cornStrokeMultiple"/>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>

</style>
