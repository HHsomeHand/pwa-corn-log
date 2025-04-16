<script lang="ts" setup>
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import ConfigViewMode from "@/view/ConfigView/cpn/ConfigViewMode.vue";
import ConfigViewBgBlur from "@/view/ConfigView/cpn/ConfigViewBgBlur.vue";
import ConfigViewBgPlus from "@/view/ConfigView/cpn/ConfigViewBgPlus.vue";
import ConfigViewText from "@/view/ConfigView/cpn/ConfigViewText.vue";
import ConfigViewFontSize from "@/view/ConfigView/cpn/ConfigViewFontSize.vue";
import {useStyleStore} from "@/store/style.store.ts";
import ConfigViewLock from "@/view/ConfigView/cpn/ConfigViewLock.vue";
import ConfigViewBg from "@/view/ConfigView/cpn/ConfigViewBg.vue";
import ConfigViewModePlus from "@/view/ConfigView/cpn/ConfigViewModePlus.vue";
import ConfigViewStoreManager from "@/view/ConfigView/cpn/ConfigViewStoreManager/ConfigViewStoreManager.vue";
import ConfigViewLogStyle from "@/view/ConfigView/cpn/ConfigViewLogStyle.vue";
import ConfigViewAbout from "@/view/ConfigView/cpn/ConfigViewAbout.vue";

function onClickLeft() {
  history.back();
}


const wallpaperStore = useWallpaperStore();

const bgConfigRef = useTemplateRef("bg-config");

const styleStore = useStyleStore();

function onDefaultClick() {
  wallpaperStore.setDefault();
  styleStore.setDefault();

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

    <config-view-store-manager />

    <config-view-log-style />

    <config-view-about />

    <config-view-font-size />

    <van-button class="!m-2 shrink-0" plain type="primary" @click="onDefaultClick">设为默认值</van-button>
  </div>
</template>

<style scoped>

</style>
