<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  console.log("clicked");

  store.generateTestData();
}
</script>

<template>
  <div class="index-view" ref="indexViewRef">
    <corn-powerful-list/>
    <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="indexViewRef"/>
  </div>
</template>

<style scoped>

</style>