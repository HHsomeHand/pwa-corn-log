<script setup>
import "@/components/CornFloatingBubble.vue"
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import {onMounted} from "vue";

const indexViewRef = ref(null);
</script>

<template>
  <div class="index-view" ref="indexViewRef">
    <corn-floating-bubble :container="indexViewRef"/>
  </div>
</template>

<style scoped>

</style>