<script setup lang="ts">



import IndexView from "@/view/IndexView/IndexView.vue";
import CornStoreCountDisplayer from "@/view/LoveView/cpns/CornStoreCountDisplayer.vue";
</script>

<template>
  <index-view>
    <template #list-bottom>
      <corn-store-count-displayer/>
    </template>
  </index-view>
</template>

<style scoped>

</style>