<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: ""
  }
});

const booleanValue = defineModel();

const statusText = computed(() => {
  return booleanValue.value ? "启用" : "停用";
})

function toggle() {
  booleanValue.value = !booleanValue.value;
}
</script>

<template>
  <van-cell :title="title" :value="statusText" clickable @click="toggle"/>
</template>

<style scoped>

</style>
