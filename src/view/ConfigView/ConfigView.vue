<script setup>
import PickColors from 'vue-pick-colors'

import colorValues, {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.js";

function onClickLeft() {
  history.back();
}

const colors = ref([CUSTOM_ORANGE_HEX, ...Object.values(colorValues)]);

const APP_MODE = Object.freeze({
  LOG: {
    title: "日志",
    defaultPrimaryColor: CUSTOM_ORANGE_HEX,
  },
  LOVE: {
    title: "善举",
    defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.RED),
  },
  DRUG: {
    title: "药律",
    defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.BLUE),
  },
  TREATMENT: {
    title: "戒律",
    defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.GREEN),
  }
});

const customAppMode = useConfig('customAppMode', {...APP_MODE});

// 不要直接修改, 使用 changeAppMode 来修改
const currentModeKey = useConfig('currentMode', 'LOG');

const currentMode = computed(() => {
  return {
    ...APP_MODE[currentModeKey.value],
  }
})

const PRIMARY_COLOR_VAR_NAME = '--van-primary-color';

const primaryColor = useCssVar(PRIMARY_COLOR_VAR_NAME, CUSTOM_ORANGE_HEX);

watch(primaryColor, () => {
  customAppMode.value[currentModeKey.value].customPrimaryColor = primaryColor.value;
});

// changeAppMode(APP_MODE.LOG)
function changeAppMode(key) {
  let mode = customAppMode.value[key];
  currentModeKey.value = key;
  primaryColor.value = mode.customPrimaryColor || mode.defaultPrimaryColor;
}

function onModeCellClick() {
  let actions = Object.entries(APP_MODE).map(([key, mode]) => {
    return {
      name: mode.title,
      callback(item) {
        changeAppMode(key);
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