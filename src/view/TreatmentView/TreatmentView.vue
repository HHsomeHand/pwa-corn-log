<script setup lang="ts">
import DrugView from "@/view/DrugView/DrugView.vue";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

const {t} = useScopedI18n('treatmentView')
</script>

<template>
<!--
  <drug-view hint="您已戒断">
-->
  <drug-view :hint="t('hint')">
    <template #list-bottom>
      <corn-statistics-displayer/>
    </template>
  </drug-view>
</template>

<style scoped>

</style>
