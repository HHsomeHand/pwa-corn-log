<script setup lang="ts">
import {useStyleStore} from "@/store/style.store.ts";
import {storeToRefs} from "pinia";
import CornNumStepperCell from "@/components/CornNumStepperCell.vue";
import {useI18n} from "vue-i18n";

const styleStore = useStyleStore();

const {
  cornFontSizeXs,
  cornFontSizeSm,
  cornFontSizeMd,
  cornFontSizeLg,
} = storeToRefs(styleStore);

const {t} = useI18n();
</script>

<template>
<!--
  <van-cell-group title="字体设置 · 像素单位 ">
-->
  <van-cell-group :title="t('config.fontSize.cellGroupTitle')">
<!--
    <corn-num-stepper-cell title="最小字体" v-model="cornFontSizeXs" />
-->
    <corn-num-stepper-cell :title="t('config.fontSize.xsFontSize')" v-model="cornFontSizeXs" />

<!--
    <corn-num-stepper-cell title="小字体" v-model="cornFontSizeSm" />
-->
    <corn-num-stepper-cell :title="t('config.fontSize.smFontSize')" v-model="cornFontSizeSm" />

<!--
    <corn-num-stepper-cell title="中号字体" v-model="cornFontSizeMd" />
-->
    <corn-num-stepper-cell :title="t('config.fontSize.mdFontSize')" v-model="cornFontSizeMd" />

<!--
    <corn-num-stepper-cell title="最大字体" v-model="cornFontSizeLg" />
-->
    <corn-num-stepper-cell :title="t('config.fontSize.lgFontSize')" v-model="cornFontSizeLg" />
  </van-cell-group>
</template>

<style scoped>

</style>
