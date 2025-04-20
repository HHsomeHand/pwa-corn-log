<script setup lang="ts">
import {useStyleStore} from "@/store/style.store.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

const styleStore = useStyleStore();

const {
    cornLogSpaceHeight,
    isAlwaysShowComment,
    cornLogEmptyCommentMinHeight,
    cornLogMarginBottom,
    cornListDateGap,
    cornLogTimeFontSize,
    cornLogTimeWidth,
    cornLogTimeHeight,
    cornLogTimeDateMinWidth,
} = storeToRefs(styleStore);

const {t} = useI18n();
const {t: st} = useScopedI18n('config.logStyle');
</script>

<template>
<!--
  <van-cell-group title="日志样式 · 列表">
-->
  <van-cell-group :title="t('config.logStyle.listStyleTitle')">
<!--
    <corn-num-stepper-cell title="条目的间距" v-model="cornLogMarginBottom" :min="0" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.entryGap')" v-model="cornLogMarginBottom" :min="0" />

<!--
    <corn-num-stepper-cell title="日期的间距" v-model="cornListDateGap" :min="-Infinity" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.dateGap')" v-model="cornListDateGap" :min="-Infinity" />
  </van-cell-group>

<!--
  <van-cell-group title="日志样式 · 日志条目">
-->
  <van-cell-group :title="t('config.logStyle.logEntryTitle')">
<!--
    <corn-num-stepper-cell title="日志条目增高" v-model="cornLogSpaceHeight" :min="0" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.riseEntryHeight')" v-model="cornLogSpaceHeight" :min="0" />

<!--
    <corn-toggle-enable-cell title="恒显示备注" v-model="isAlwaysShowComment" />
-->
    <corn-toggle-enable-cell  :title="t('config.logStyle.alwaysShowComment')" v-model="isAlwaysShowComment" />

<!--
    <corn-num-stepper-cell title="备注的最小高度" v-model="cornLogEmptyCommentMinHeight" :min="0" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.commentMiniHeight')" v-model="cornLogEmptyCommentMinHeight" :min="0" />

<!--
    <corn-num-stepper-cell title="时间文字大小" v-model="cornLogTimeFontSize" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.timeFontSize')" v-model="cornLogTimeFontSize" />

<!--
    <corn-num-stepper-cell title="时间宽度" v-model="cornLogTimeWidth" />
-->
    <corn-num-stepper-cell :title="st('timeWidth')" v-model="cornLogTimeWidth" />

<!--
    <corn-num-stepper-cell title="时间高度" v-model="cornLogTimeHeight" />
-->
    <corn-num-stepper-cell :title="st('timeHeight')" v-model="cornLogTimeHeight" />

<!--
    <corn-num-stepper-cell title="日期最小宽度" v-model="cornLogTimeDateMinWidth" />
-->
    <corn-num-stepper-cell :title="t('config.logStyle.dateMiniWidth')" v-model="cornLogTimeDateMinWidth" />

  </van-cell-group>

</template>

<style scoped>

</style>
