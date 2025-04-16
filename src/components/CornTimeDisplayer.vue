<script setup>
import {useStyleStore} from "@/store/style.store.js";
import {storeToRefs} from "pinia";

const props = defineProps({
  date: {
    type: Date,
    default: () => new Date()
  }
})

function padNum(num) {
  return String(num).padStart(2, '0');
}

let styleStore = useStyleStore();

const {
  cornLogTimeFontSize
} = storeToRefs(styleStore);

const cornLogTimeFontSizeFmt = computed(() => cornLogTimeFontSize.value + 'px');
</script>

<template>
  <div class="inline-flex items-center">
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
  padding: 10px 5px;
  color: #fff;
  font-size: v-bind(cornLogTimeFontSizeFmt);
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 3px;
}
</style>
