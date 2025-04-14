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
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import ConfigViewMode from "@/view/ConfigView/cpn/ConfigViewMode.vue";
import ConfigViewBgBlur from "@/view/ConfigView/cpn/ConfigViewBgBlur.vue";
import ConfigViewBgPlus from "@/view/ConfigView/cpn/ConfigViewBgPlus.vue";
import ConfigViewBg from "@/view/ConfigView/cpn/ConfigViewBg.vue";
import ConfigViewText from "@/view/ConfigView/cpn/ConfigViewText.vue";


function onClickLeft() {
  history.back();
}


const wallpaperStore = useWallpaperStore();

const bgConfigRef = useTemplateRef("bg-config");

function onDefaultClick() {
  wallpaperStore.setDefault();

  bgConfigRef.value?.emptyPhoto();
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
    <config-view-mode />

    <config-view-lock />

    <config-view-bg ref="bg-config"/>

    <config-view-mode-plus />

    <config-view-bg-blur />

    <config-view-bg-plus />

    <config-view-text />

    <van-button class="!m-2 shrink-0" plain type="primary" @click="onDefaultClick">设为默认值</van-button>
  </div>
</template>

<style scoped>

</style>