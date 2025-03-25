<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList.vue";


const indexViewRef = ref(null);

function onClick() {
  console.log("clicked");
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