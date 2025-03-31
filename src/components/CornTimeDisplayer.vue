<script setup>
const props = defineProps({
  date: {
    type: Date,
    default: () => new Date()
  }
})

function padNum(num) {
  return String(num).padStart(2, '0');
}
</script>

<template>
  <div class="inline-flex">
    <span class="block">{{ padNum(date.getHours()) }}</span>
    <span class="colon">:</span>
    <span class="block">{{ padNum(date.getMinutes()) }}</span>
    <span class="colon">:</span>
    <span class="block">{{ padNum(date.getSeconds()) }}</span>
  </div>
</template>

<style scoped>
.colon {
  display: inline-block;
  margin: 0 2px;
  color: var(--van-primary-color);
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 3px;
}
</style>