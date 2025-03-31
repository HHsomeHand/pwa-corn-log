<script setup>
import {cornMitt} from "@/utils/mitt.js";


</script>

<template>
  <div class="app-component flex flex-col max-w-md mx-auto fixed bottom-0 top-0 left-0 right-0">
    <div class="nav-teleport shrink-0">

    </div>

    <router-view></router-view>

    <van-tabbar class="!w-screen" route placeholder>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cal" icon="calendar-o">日历</van-tabbar-item>
      <van-tabbar-item icon="friends-o">药物</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
:deep(.van-tabbar__placeholder) {
  flex-shrink: 0;
}
</style>