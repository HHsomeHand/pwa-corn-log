<script lang="ts" setup>
import {useWallpaperStore} from "@/store/wallpaper.store.ts";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store.js";
import {LogStoreKey} from "@/injectionKeys.js";
import LockView from "@/view/LockView/LockView.vue";
import {useI18n} from "vue-i18n";


// 保证主题色加载正确
const appStore = useAppStore();

let appRef = useTemplateRef("appRef");

const wallpaperStore = useWallpaperStore();

const {currentWallpaperBase64} = storeToRefs(wallpaperStore);

onMounted(() => {
  watch(currentWallpaperBase64, () => {
    if (appRef.value === null) return;

    // 不要在下面的style块中使用v-bind, 不稳定, 有时候无法正确设置图片
    appRef.value.style.backgroundImage = `url(${currentWallpaperBase64.value})`
  }, { immediate: true })
});

// const route = useRoute();
// // 基于路由名称和时间戳生成唯一的 key
// const routeKey = computed(() => `${route.name}-${Date.now()}`);

const store = useLogStoreFactory(appStore.currentMode.storeName)();

provide(LogStoreKey, store);

const {t} = useI18n();
</script>

<template>
  <div ref="appRef" class="app-component my-flex flex-col max-w-md mx-auto fixed bottom-0 top-0 left-0 right-0">
    <div class="nav-teleport shrink-0">

    </div>

<!--    <router-view :key="routeKey"></router-view>-->
    <router-view></router-view>

    <van-tabbar class="!w-screen" route placeholder>
<!--      首页-->
      <van-tabbar-item to="/" icon="home-o">{{t('tabBar.index')}}</van-tabbar-item>
<!--      日历-->
      <van-tabbar-item to="/cal" icon="calendar-o">{{t('tabBar.calc')}}</van-tabbar-item>
<!--      搜索-->
      <van-tabbar-item to="/search" icon="search">{{t('tabBar.search')}}</van-tabbar-item>
<!--      设置-->
      <van-tabbar-item to="/config" icon="setting-o">{{t('tabBar.settings')}}</van-tabbar-item>
    </van-tabbar>

    <lock-view/>
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
