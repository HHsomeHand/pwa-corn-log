<script setup>
import PickColors from 'vue-pick-colors'

import colorValues, {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.ts";
import {useCssVar} from "@/hooks/useCssVar.ts";
import {useConfig} from "@/hooks/useConfig.ts";
import {showActionSheet} from "@/components/CornActionSheet/utils.ts";
import {useAppStore} from "@/store/app.store.ts";
import {storeToRefs} from "pinia";
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import CornCellColorPicker from "@/view/ConfigView/cpn/CornCellColorPicker.vue";
import CornCellEnumNumber from "./cpn/CornCellEnumNumber.vue";
import {WALLPAPER_SIZE_MAPPER, WALLPAPER_X_POS, WALLPAPER_Y_POS} from "@/const/wallpaper.js";
import {useLockStore} from "@/store/lock.store.js";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.js";


function onClickLeft() {
  history.back();
}

const colors = ref([CUSTOM_ORANGE_HEX, ...Object.values(colorValues)]);

const appStore = useAppStore();

const {currentTitle, primaryColor} = storeToRefs(appStore);

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
  cornCommentColor,
  wallpaperSize,
  wallpaperPosX,
  wallpaperPosY,
  vantTextColor,
  vantTextColor2,
  vantTextColor3,
  cornTextStrokeWidth,
  cornTextStrokeColor,
  cornStrokeMultiple,
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

function onDefaultClick() {
  wallpaperStore.setDefault();
  fileList.value = [];
}

const lockStore = useLockStore();

const lockStatusText = computed(() => {
  return lockStore.isLock ? "启用" : "停用";
})

function toggleLock() {
  lockStore.isLock = !lockStore.isLock;
}

async function getPassword() {
  const inputPassword = await showInputPopup({
    label: '密码',
    submitText: '提交',
    placeholder: '4321'
  });

  lockStore.password = inputPassword;
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

  <div class="config-view corn-view my-flex flex-col">


    <van-cell-group title="模式">
      <van-cell title="当前模式" :value="currentTitle" @click="onModeCellClick" is-link/>

      <corn-cell-color-picker title="当前主题色" v-model="primaryColor" :colors="colors"/>
    </van-cell-group>

    <van-cell-group title="隐私模式">
      <van-cell title="启用状态" :value="lockStatusText" clickable @click="toggleLock"/>

      <van-cell title="密码" :value="lockStore.password" clickable @click="getPassword"/>

    </van-cell-group>

    <van-cell-group title="背景图片">
      <van-cell title="当前背景图片">
        <template #value>
          <van-uploader v-model="fileList" reupload max-count="1"/>
        </template>
      </van-cell>

      <corn-cell-color-picker title="全局元素背景色" v-model="vantBackground2Color"/>
      <corn-cell-color-picker title="壁纸背景色" v-model="wallpaperBgColor"/>
      <corn-cell-color-picker title="注释背景色" v-model="cornCommentColor"/>

    </van-cell-group>

    <van-cell-group title="背景图片・毛玻璃特效 (背景色需透明) ">
      <van-cell title="是否启用">
        <template #right-icon>
          <van-checkbox v-model="isBlur"/>
        </template>
      </van-cell>

      <van-cell title="模糊半径">
        <template #right-icon>
          <van-stepper v-model="cornBackdropPx"/>
        </template>
      </van-cell>
    </van-cell-group>

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
    <van-button class="!m-2 shrink-0" plain type="primary" @click="onDefaultClick">设为默认值</van-button>
  </div>
</template>

<style scoped>

</style>