<script setup lang="ts">
import DrugView from "@/view/DrugView/DrugView.vue";


</script>

<template>
  <drug-view hint="您已戒断">
    <template #list-bottom>
      <corn-statistics-displayer/>
    </template>
  </drug-view>
</template>

<style scoped>

</style>