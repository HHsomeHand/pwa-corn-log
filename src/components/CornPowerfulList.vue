<script setup>
let list = ref([]);
for (let i = 1; i <= 399; i++) {
  list.value.push({ id: i - 1, name: `hzx${i}` });
}
</script>

<template>
  <RecycleScroller
      class="scroller"
      :items="list"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
  >
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>