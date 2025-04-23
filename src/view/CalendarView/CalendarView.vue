<script setup>


import {useRouter} from "vue-router";
import {ROUTE_INDEX} from "@/const/route.ts";
import {useI18n} from "vue-i18n";

const router = useRouter();

function onConfirm(date) {
  router.push({
    path: ROUTE_INDEX,
    query: { timestamp: date.getTime() }
  });
}

const {t} = useI18n();
</script>

<template>
  <div class="calendar-view corn-view">
    <van-calendar
        @confirm="onConfirm"
        :poppable="false"
        :title="t('calc.calcTitle')"
        :min-date="new Date(0)"
        :max-date="new Date()"
        switch-mode="month"
    />
  </div>
</template>

<style scoped>

</style>
