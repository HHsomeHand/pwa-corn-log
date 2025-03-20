<script setup>

</script>

<template>
  <div class="app-component max-w-md mx-auto">
      <router-view></router-view>
  </div>

  <van-tabbar class="fixed bottom-0 left-0 right-0" route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="calendar-o">日历</van-tabbar-item>
    <van-tabbar-item icon="friends-o">药物</van-tabbar-item>
    <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>