<script setup>

function onConfirm(date) {
  console.log(date);
}
</script>

<template>
  <div class="calendar-view overflow-y-scroll">
    <van-calendar
        @confirm="onConfirm"
        :poppable="false"
        title="选择时间"
    />
  </div>
</template>

<style scoped>

</style>