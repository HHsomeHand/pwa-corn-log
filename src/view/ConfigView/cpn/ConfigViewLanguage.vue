<script setup lang="ts">

import {showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";
import {languageActionSheet} from "@/i18n/constants";
import {changeLanguage} from "@/i18n/utils";

async function getLanguage() {
  const targetLanguage = await showActionSheetByArrayEx(languageActionSheet);

  changeLanguage(targetLanguage);
}
</script>

<template>
  <van-cell-group title="语言">
    <van-cell
        title="切换语言"
        clickable
        @click="getLanguage"
    />
  </van-cell-group>
</template>

<style scoped>

</style>
