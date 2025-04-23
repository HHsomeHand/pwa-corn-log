<script setup lang="ts">

import {copyToClipboard} from "@/utils";
import {showDialog} from "vant";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const qq = ref("2402398917");

const redNoteId = ref("3012103640");

// TODO: 等翻译人员多了以后, 抽取为单独的 markdown (.md) 文件, 且弄一个 AboutView.vue
const aboutMsg = t('config.about.aboutMsg');

function showAboutDialog() {
  showDialog({
    //  '鸣谢'
    title: t('config.about.thankMsg'),
    message: aboutMsg,
    messageAlign: "left"
  })
}
</script>

<template>
<!--  <van-cell-group title="详细信息">-->
  <van-cell-group :title="t('config.about.detailTitle')">
<!--    <van-cell
        title="版本号"
        value="1.0.0"
    />-->
    <van-cell
        :title="t('config.about.version')"
        value="1.0.2"
    />

<!--        <van-cell
        title="作者QQ"-->
<!--    <van-cell-->
<!--        :title="t('config.about.qq')"-->
<!--        :value="qq"-->
<!--        @click="copyToClipboard(qq, t('config.about.copySuccessMsg'))"-->
<!--        clickable-->
<!--    />-->

<!--        <van-cell
        title="作者小红书"-->
<!--    <van-cell-->
<!--        :title="t('config.about.redNote')"-->
<!--        :value="redNoteId"-->
<!--        @click="copyToClipboard(redNoteId, t('config.about.copySuccessMsg'))"-->
<!--        clickable-->
<!--    />-->

    <van-cell
        title="Gitee"
        :value="t('config.about.copyTip')"
        @click="copyToClipboard('https://gitee.com/HHandHsome/pwa-corn-log', t('config.about.copySuccessMsg'))"
        clickable
    />

    <van-cell
        title="GitHub"
        :value="t('config.about.copyTip')"
        @click="copyToClipboard('https://github.com/HHsomeHand/pwa-corn-log', t('config.about.copySuccessMsg'))"
        clickable
    />

<!--        <van-cell
        title="关于"-->
    <van-cell
        :title="t('config.about.about')"
        clickable
        is-link
        @click="showAboutDialog"
    />
  </van-cell-group>

</template>

<style scoped>

</style>
