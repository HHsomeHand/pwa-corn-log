<script setup lang="ts">

import CornCellColorPicker from "@/view/ConfigView/cpn/CornCellColorPicker.vue";
import colorValues, {CUSTOM_ORANGE_HEX} from "@/color/vant.color.ts";
import {useAppStore} from "@/store/app.store.ts";
import {storeToRefs} from "pinia";
import {showActionSheet} from "@/components/CornActionSheet/utils.ts";

const colors = ref([CUSTOM_ORANGE_HEX, ...Object.values(colorValues)]);

const appStore = useAppStore();

const {currentTitle, primaryColor} = storeToRefs(appStore);

function onModeCellClick() {
  let actions = Object.entries(appStore.customAppMode).map(([key, mode]) => {
    return {
      name: mode.title,
      callback(item) {
        appStore.changeAppMode(key);
      },
    } // END OF RETURN
  });
  showActionSheet(actions);
}

</script>

<template>
  <van-cell-group title="模式">
    <van-cell title="当前模式" :value="currentTitle" @click="onModeCellClick" is-link/>

    <corn-cell-color-picker title="当前主题色" v-model="primaryColor" :colors="colors"/>
  </van-cell-group>
</template>

<style scoped>

</style>