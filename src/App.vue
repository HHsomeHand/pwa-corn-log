<script setup>
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app.store.js";
import {useCssVar} from "@/hooks/useCssVar.ts";
import {useStyleElement} from "@/hooks/useStyleElement.ts";

// 保证主题色加载正确
useAppStore();

let appRef = ref(null);

const wallpaperStore = useWallpaperStore();

const {currentWallpaperBase64} = storeToRefs(wallpaperStore);

onMounted(() => {
  watch(currentWallpaperBase64, () => {
    // 不要在下面的style块中使用v-bind, 不稳定, 有时候无法正确设置图片
    appRef.value.style.backgroundImage = `url(${currentWallpaperBase64.value})`
  }, { immediate: true })
});
</script>

<template>
  <div ref="appRef" class="app-component flex flex-col max-w-md mx-auto fixed bottom-0 top-0 left-0 right-0">
    <div class="nav-teleport shrink-0">

    </div>

    <router-view></router-view>

    <van-tabbar class="!w-screen" route placeholder>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cal" icon="calendar-o">日历</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/config" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
:deep(.van-tabbar__placeholder) {
  flex-shrink: 0;
}

.app-component {
  background-repeat: no-repeat;

  background-size: var(--wallpaper-size);

  background-color: var(--wallpaper-bg-color);

  background-position: var(--wallpaper-pos-x) var(--wallpaper-pos-y);
}
</style>