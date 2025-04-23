<script setup lang="ts">

import CornCellColorPicker from "@/components/CornCellColorPicker.vue";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const wallpaperStore = useWallpaperStore();

const {
  currentWallpaperBase64,
  vantBackground2Color,
  wallpaperBgColor,
  cornCommentColor,
} = storeToRefs(wallpaperStore);


let initFileList = [];

if (currentWallpaperBase64.value !== 'none') {
  initFileList.push({
    content: currentWallpaperBase64.value,
  })
}

const fileList = ref([...initFileList]);

watch(fileList, () => {
  currentWallpaperBase64.value = fileList.value[0]?.content || 'none';
})

defineExpose({
  emptyPhoto() {
    fileList.value = [];
  }
});
</script>

<template>
<!--  <van-cell-group title="背景图片">-->
  <van-cell-group :title="t('config.bg.cellGroupTitle')">
<!--    <van-cell title="当前背景图片">-->
    <van-cell :title="t('config.bg.currBgImage')">
      <template #value>
        <van-uploader v-model="fileList" reupload max-count="1"/>
      </template>
    </van-cell>

<!--
    <corn-cell-color-picker title="全局元素背景色" v-model="vantBackground2Color"/>
 -->
    <corn-cell-color-picker :title="t('config.bg.globalElBgColor')" v-model="vantBackground2Color"/>

<!--
    <corn-cell-color-picker title="壁纸背景色" v-model="wallpaperBgColor"/>
-->
    <corn-cell-color-picker :title="t('config.bg.wallpaperBgColor')" v-model="wallpaperBgColor"/>

<!--
    <corn-cell-color-picker title="注释背景色" v-model="cornCommentColor"/>
-->
    <corn-cell-color-picker :title="t('config.bg.commentBgColor')" v-model="cornCommentColor"/>

  </van-cell-group>
</template>

<style scoped>

</style>
