<script setup lang="ts">


function importJSON() {

}

function exportJSON() {

}

function clearAll() {

}
</script>

<template>
  <van-cell-group title="数据备份">
    <van-cell title="导入" clickable @click="importJSON" is-link/>

    <van-cell title="导出" clickable @click="exportJSON" is-link/>

    <van-cell title="清空" clickable @click="clearAll" is-link/>
  </van-cell-group>
</template>

<style scoped>

</style>