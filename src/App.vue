<script setup>

</script>

<template>
  <div class="app-component flex flex-col max-w-md mx-auto fixed bottom-0 top-0 left-0 right-0">
    <van-nav-bar
        class="shrink-0"
        left-text="药律"
        fixed
        placeholder
    />

    <router-view class="overflow-auto grow"></router-view>

    <van-tabbar class="!static !w-screen" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="calendar-o">日历</van-tabbar-item>
      <van-tabbar-item icon="friends-o">药物</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>

</style>