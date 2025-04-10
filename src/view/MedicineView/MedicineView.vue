<script setup>


</script>

<template>
  <teleport to=".nav-teleport">
    <van-nav-bar
        left-text="药律"
        fixed
        placeholder
    >
      <template #right>
        <van-icon name="wap-nav" size="25"/>
      </template>
    </van-nav-bar>
  </teleport>

  <div class="index-view corn-view" ref="indexViewRef">

  </div>
</template>

<style scoped>

</style>