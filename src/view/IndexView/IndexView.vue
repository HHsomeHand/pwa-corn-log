<script lang="ts" setup>

import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
// @ts-ignore
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import CornPowerfulList from "@/components/CornPowerfulList/CornPowerfulList.vue";
import type {LogEntry} from "@/model/logs.type.ts";

const baseIndexRef = useTemplateRef('baseIndexRef')

const listRef = ref<InstanceType<typeof CornPowerfulList> | null>(null);

onMounted(() => {
  listRef.value = baseIndexRef.value?.listRef ?? null;
})

function onClick() {
  async function onSubmit(logData: LogEntry) {
    await listRef.value?.addEntry?.(logData);
    listRef.value?.toBottom?.();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

</script>

<template>
  <base-index-view ref="baseIndexRef">
    <template #default>
      <corn-floating-bubble @click="onClick"/>

      <slot></slot>
    </template>

    <template #list-bottom>
      <slot name="list-bottom"></slot>
    </template>
  </base-index-view>
</template>

<style scoped>

</style>