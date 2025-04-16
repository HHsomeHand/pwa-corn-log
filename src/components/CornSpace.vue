<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div :style="{ height: height + 'px' }"></div>
</template>

<style scoped>

</style>
