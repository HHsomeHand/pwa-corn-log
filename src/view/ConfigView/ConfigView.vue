<script setup>
import PickColors from 'vue-pick-colors'

import colorValues, {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.js";
import {useAppStore} from "@/store/app.store.js";
import {storeToRefs} from "pinia";
import {useWallpaperStore} from "@/store/wallpaper.store.js";
import CornCellColorPicker from "@/view/ConfigView/cpn/CornCellColorPicker.vue";

function onClickLeft() {
  history.back();
}

const colors = ref([CUSTOM_ORANGE_HEX, ...Object.values(colorValues)]);

const appStore = useAppStore();

const {currentMode, primaryColor} = storeToRefs(appStore);

function onModeCellClick() {
  let actions = Object.entries(appStore.APP_MODE).map(([key, mode]) => {
    return {
      name: mode.title,
      callback(item) {
        appStore.changeAppMode(key);
      },
    } // END OF RETURN
  });
  showActionSheet(actions);
}

const wallpaperStore = useWallpaperStore();

const {
  currentWallpaperBase64,
  vantBackground2Color,
  wallpaperBgColor,
  isBlur,
  cornBackdropPx,
  cornCommentColor
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

function onClick() {
  wallpaperStore.setDefault();
  fileList.value = [];
}
</script>

<template>
  <teleport to=".nav-teleport">
    <van-nav-bar
        title="设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </teleport>

  <div class="config-view corn-view flex flex-col">


    <van-cell-group title="模式">
      <van-cell title="当前模式" :value="currentMode.title" @click="onModeCellClick" is-link/>

      <corn-cell-color-picker title="当前主题色" v-model="primaryColor" :colors="colors"/>
    </van-cell-group>

    <van-cell-group title="背景图片">
      <van-cell title="当前背景图片">
        <template #value>
          <van-uploader v-model="fileList" reupload max-count="1" />
        </template>
      </van-cell>

      <corn-cell-color-picker title="全局元素背景色" v-model="vantBackground2Color"/>
      <corn-cell-color-picker title="壁纸背景色" v-model="wallpaperBgColor"/>
      <corn-cell-color-picker title="注释背景色" v-model="cornCommentColor"/>

    </van-cell-group>

    <van-cell-group title="背景图片毛玻璃特效">
      <van-cell title="是否启用">
        <template #right-icon>
          <van-checkbox v-model="isBlur"/>
        </template>
      </van-cell>

      <van-cell title="模糊半径">
        <template #right-icon>
          <van-stepper v-model="cornBackdropPx" />
        </template>
      </van-cell>
    </van-cell-group>


    <van-button class="!m-2 shrink-0" plain type="primary" @click="onClick">朴素按钮</van-button>
  </div>
</template>

<style scoped>

</style>