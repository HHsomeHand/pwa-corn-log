<script lang="ts" setup>

import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
// @ts-ignore
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import CornPowerfulList from "@/components/CornPowerfulList/CornPowerfulList.vue";

const baseIndexRef = useTemplateRef('baseIndexRef')

const listRef = ref<InstanceType<typeof CornPowerfulList>>(null);

onMounted(() => {
  listRef.value = baseIndexRef.value.listRef;
})

function onClick() {
  async function onSubmit(logData: Record<string, any>) {
    await listRef.value?.addEntry?.(logData);
    listRef.value?.toBottom?.();
  }

  showLogFormPopup(onSubmit, {id: new Date().getTime() + ""});
}

</script>

<template>
  <base-index-view ref="baseIndexRef">
    <template #default="{viewDivRef}">
      <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="viewDivRef"/>
    </template>
  </base-index-view>
</template>

<style scoped>

</style>