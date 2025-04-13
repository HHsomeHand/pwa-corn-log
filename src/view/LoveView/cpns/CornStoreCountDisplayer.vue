<script setup lang="ts">
import {LogStoreKey} from "@/injectionKeys.ts";
import cornMitt from "@/mitt/mitt.ts";

let store = inject(LogStoreKey);

const count = ref(0);

async function updateCount() {
  count.value = await store.getLogsCount();
}

updateCount();

cornMitt.on("list:update", updateCount);
cornMitt.on("list:delete", updateCount);
cornMitt.on("list:add", updateCount);

</script>

<template>
  <van-divider v-if="count > 0">您已经做了 {{count}} 件善事了!</van-divider>

</template>

<style scoped>

</style>