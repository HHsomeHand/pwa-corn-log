<script setup>

import {useLogStore} from "@/store/logs.store.js";

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

const store = useLogStore();

const logs = ref([]);

async function onSearch() {
  if (searchType.value === SEARCH_TYPE.LOG) {
    logs.value = await store.searchLogsByLog(searchContent.value);
  } else if (searchType.value === SEARCH_TYPE.COMMENT) {
    logs.value = await store.searchLogsByComment(searchContent.value);
  }

  console.log(logs.value);
}
</script>

<template>
  <div class="search-view view">
    <teleport to=".nav-teleport">
        <div class="nav-bar flex justify-between items-center px-2">
          <van-dropdown-menu>
            <van-dropdown-item v-model="searchType" :options="searchOption" />
          </van-dropdown-menu>

          <van-search
              class="grow"
              v-model="searchContent"
              shape="round"
              placeholder="请输入搜索内容"
              background="transparent"
              @search="onSearch"
          />

          <van-button
              plain
              type="primary"
              size="small"
              class="shrink-0"
              @click="onSearch"
          >
            搜索
          </van-button>
        </div>
    </teleport>
  </div>
</template>

<style scoped>
.nav-bar {
  --van-dropdown-menu-title-text-color: var(--van-primary-color);
  background: white;
  --van-search-label-padding: 0px 0px;
  /* 上、右、下、左 */
  --van-search-padding: 10px 8px 10px 0px;

  :deep(.van-dropdown-menu__title::after) {
    display: none;
  }
}
</style>