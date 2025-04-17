<script setup lang="ts">

import {showActionSheetByArrayEx} from "@/components/CornActionSheet/utils.ts";
import {languageActionSheet} from "@/i18n/constants";
import {changeLanguage} from "@/i18n/utils";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

async function getLanguage() {
  const targetLanguage = await showActionSheetByArrayEx(languageActionSheet);

  changeLanguage(targetLanguage);
}

const {t} = useScopedI18n("config.language");
</script>

<template>
<!--  "语言"-->
  <van-cell-group :title="t('cellGroupTitle')">
<!--     "切换语言"-->
    <van-cell
        :title="t('changeLanguageBtnText')"
        clickable
        @click="getLanguage"
    />
  </van-cell-group>
</template>

<style scoped>

</style>
