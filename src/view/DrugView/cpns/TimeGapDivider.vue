<script setup>
import {useTimeGap} from "@/hooks/useTimeGap.js";

const props = defineProps({
  targetDate: {
    type: Date,
    default: () => new Date(),
  },
  hint: {
    type: String,
    default: ""
  }
})

const currentDate = ref(new Date());

const {timeGap} = useTimeGap(props.hint, computed(() => props.targetDate));
</script>

<template>
  <van-divider>{{timeGap}}</van-divider>
</template>

<style scoped>

</style>