<script setup>
import CornFloatingBubble from "@/components/CornFloatingBubble.vue";
import CornPowerfulList from "@/components/CornPowerfulList.vue";
import {useLogStore} from "@/store/logs.store.js";
import {cornMitt} from "@/utils/mitt.js";


const indexViewRef = ref(null);

const store = useLogStore()

function onClick() {
  console.log("clicked");

  store.generateTestData();
}

const showActionSheet = ref(false);

const listRef = ref(null);

const actions = ref([
  {
    name: '滚动到底部',
    callback() {
      if (!listRef.value) return;
      listRef.value.toBottom();
    }
  },
  { name: '选项二' },
  { name: '选项三' },
]);

cornMitt.on('nav-right-click', (event) => {
  showActionSheet.value = true;
});
</script>

<template>
  <div class="index-view" ref="indexViewRef">
    <corn-powerful-list ref="listRef"/>
    <corn-floating-bubble @click="onClick" :size="65" :gap-y="12" :container="indexViewRef"/>
    <van-action-sheet
        v-model:show="showActionSheet"
        :actions="actions"
        close-on-click-action
    />
  </div>
</template>

<style scoped>

</style>