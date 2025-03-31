<script setup>

const SEARCH_TYPE = Object.freeze({
  LOG: 'log',
  COMMENT: 'comment',
});

const searchType = ref(SEARCH_TYPE.LOG);

const searchOption = [
  { text: '日志内容', value: SEARCH_TYPE.LOG},
  { text: '备注', value: SEARCH_TYPE.COMMENT },
];

const searchContent = ref("");
</script>

<template>
  <div class="search-view view">
    <teleport to=".nav-teleport">
      <van-nav-bar
          fixed
          placeholder
          right-text="搜索"
      >
        <template #left>
          <van-dropdown-menu>
            <van-dropdown-item v-model="searchType" :options="searchOption" />
          </van-dropdown-menu>
        </template>

        <template #title>
          <van-search
              v-model="searchContent"
              shape="round"
              placeholder="请输入搜索内容"
          />
        </template>
      </van-nav-bar>
    </teleport>
  </div>
</template>

<style scoped>

</style>