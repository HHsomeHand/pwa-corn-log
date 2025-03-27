<script setup>
import { vScroll } from '@vueuse/components'
import {useLogStore} from "@/store/logs.store.js";
import {fmtDate, getDomElement} from "@/utils/index.js";
import {useStoreUtils} from "@/hooks/storeUtils.hook.js";
import {useUpdateLogs} from "@/hooks/updateLogs.hook.js";

const logsCache = ref([])

const store = useLogStore()

const storeUtils = useStoreUtils(store);

const scrollerRef = ref(null)

const {onScroll} = useUpdateLogs(scrollerRef, storeUtils, logsCache);

async function toBottom() {
  if (!scrollerRef.value) return;
  const scrollerEl = getDomElement(scrollerRef.value);
  scrollerEl.scrollTo({
    top: scrollerEl.scrollHeight,
    behavior: 'smooth'
  });
}

defineExpose({
  toBottom
})
</script>

<template>
  <div class="h-full flex flex-col">
    <ul ref="scrollerRef" class="overflow-auto" v-scroll="onScroll">
      <template v-for="item in logsCache">
          <li v-if="item.type==='separator'">separator {{fmtDate(item.date)}}</li>
          <li v-if="item.type==='end'">end</li>
          <li v-else class="item">
            {{ item.log + fmtDate(item.date)}}
          </li>
      </template>

    </ul>
  </div>
</template>

<style scoped>
.item {
  border: 5px solid #ccc;
  height: 200px;
  margin: 20px;
}
</style>