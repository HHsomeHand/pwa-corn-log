<script setup lang="ts">
import DrugView from "@/view/DrugView/DrugView.vue";


</script>

<template>
  <drug-view>
    <template #list-bottom>
      <corn-statistics-displayer/>
    </template>
  </drug-view>
</template>

<style scoped>

</style>