<script setup>

const showActionSheet = ref(false);
const actions = ref([]);

defineExpose({
  showActionSheet: (_actions) => {
    actions.value = _actions;
    showActionSheet.value = true;
  }
})
</script>

<template>
  <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actions"
      close-on-click-action
      teleport="body"
  />
</template>

<style scoped>

</style>