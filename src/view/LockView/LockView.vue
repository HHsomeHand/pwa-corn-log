<script setup lang="ts">

</script>

<template>
  <div class="
    lock-view
    flex flex-col items-center justify-around
    fixed top-0 bottom-0 left-0 right-0 z-[9999]
    bg-white
    py-23
    px-8
  ">
    <van-button class="lock-view__btn" plain type="primary">药</van-button>

    <van-button class="lock-view__btn" plain type="primary">善</van-button>

    <van-button class="lock-view__btn" plain type="primary">戒</van-button>

    <van-button class="lock-view__btn" plain type="primary">解锁</van-button>
  </div>
</template>

<style scoped>
.lock-view__btn {
  @apply w-full
}
</style>