<script setup>
import PickColors from 'vue-pick-colors'

import colorValues, {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.js";
import {useAppStore} from "@/store/app.store.js";
import {storeToRefs} from "pinia";

function onClickLeft() {
  history.back();
}

const colors = ref([CUSTOM_ORANGE_HEX, ...Object.values(colorValues)]);

const appStore = useAppStore();

const {currentMode, primaryColor} = storeToRefs(appStore);

function onModeCellClick() {
  let actions = Object.entries(appStore.APP_MODE).map(([key, mode]) => {
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
  <teleport to=".nav-teleport">
    <van-nav-bar
        title="设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </teleport>

  <div class="config-view corn-view">


    <van-cell-group title="模式">
      <van-cell title="当前模式" :value="currentMode.title" @click="onModeCellClick" is-link/>

      <van-cell title="当前主题色">
        <template #value>
          <pick-colors v-model:value="primaryColor" :colors="colors"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped>

</style>