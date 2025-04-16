<script lang="ts" setup>
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import ConfigViewMode from "@/view/ConfigView/cpn/ConfigViewMode.vue";
import ConfigViewBgBlur from "@/view/ConfigView/cpn/ConfigViewBgBlur.vue";
import ConfigViewBgPlus from "@/view/ConfigView/cpn/ConfigViewBgPlus.vue";
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

    <config-view-store-manager />

    <config-view-log-style />

    <config-view-about />

    <van-button class="!m-2 shrink-0" plain type="primary" @click="onDefaultClick">设为默认值</van-button>
  </div>
</template>

<style scoped>

</style>
