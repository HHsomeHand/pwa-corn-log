<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 0
  },
  fmt: {
    type: String,
    default: 'px'
  }
})
</script>

<template>
  <div :style="{ height: height + fmt }"></div>
</template>

<style scoped>

</style>
