<script setup lang="ts">
import {LogStoreKey} from "@/injectionKeys.ts";
import {useListUpdate} from "@/hooks/useListUpdate.ts";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

let store = inject(LogStoreKey);

const count = ref(0);

async function updateCount() {
  count.value = await store.getLogsCount();
}

useListUpdate(updateCount);

const {t} = useScopedI18n('loveView');
</script>

<template>
<!--
  <van-divider v-if="count > 0">您已经做了 {{count}} 件善事了!</van-divider>
-->
  <van-divider v-if="count > 0">
    {{t('countDisplayer', {count})}}
  </van-divider>

</template>

<style scoped>

</style>
