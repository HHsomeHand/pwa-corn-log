<script setup lang="ts">

import CornCellColorPicker from "@/components/CornCellColorPicker.vue";
import colorValues, {CUSTOM_ORANGE_HEX} from "@/color/vant.color.ts";
import {useAppStore} from "@/store/app.store.ts";
import {storeToRefs} from "pinia";
import {showActionSheet} from "@/components/CornActionSheet/utils.ts";
import {useI18n} from "vue-i18n";

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

const {t} = useI18n();
</script>

<template>
<!-- title="模式" -->
  <van-cell-group :title="t('config.mode.cellGroupTitle')">
<!--  title="当前模式"  -->
    <van-cell :title="t('config.mode.currMode')" :value="currentTitle" @click="onModeCellClick" is-link/>

<!--  title="当前主题色"-->
    <corn-cell-color-picker :title="t('config.mode.currThemeColor')" v-model="primaryColor" :colors="colors"/>
  </van-cell-group>
</template>

<style scoped>

</style>
