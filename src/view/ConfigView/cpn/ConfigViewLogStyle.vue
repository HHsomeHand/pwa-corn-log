<script setup lang="ts">
import {useStyleStore} from "@/store/style.store.ts";
import {storeToRefs} from "pinia";

const styleStore = useStyleStore();

const {
    cornLogSpaceHeight,
    isAlwaysShowComment,
    cornLogEmptyCommentMinHeight,
    cornLogMarginBottom,
    cornListDateGap,
    cornLogTimeFontSize
} = storeToRefs(styleStore);
</script>

<template>
  <van-cell-group title="日志样式">
    <corn-num-stepper-cell title="日志条目增高" v-model="cornLogSpaceHeight" :min="0" />

    <corn-toggle-enable-cell title="恒显示备注" v-model="isAlwaysShowComment" />

    <corn-num-stepper-cell title="备注最小高度" v-model="cornLogEmptyCommentMinHeight" :min="0" />

    <corn-num-stepper-cell title="日志条目底部外边距" v-model="cornLogMarginBottom" :min="0" />

    <corn-num-stepper-cell title="日期间距" v-model="cornListDateGap" :min="-Infinity" />

    <corn-num-stepper-cell title="时间文字大小" v-model="cornLogTimeFontSize" />
  </van-cell-group>

</template>

<style scoped>

</style>
