<script setup>

import {useLogStore} from "@/store/logs.store.js";
import CornLog from "@/components/CornLog/CornLog.vue";
import {useCornLog} from "@/components/CornLog/hook.ts";
import {LogStoreKey} from "@/injectionKeys.js";
import {useI18n} from "vue-i18n";

const SEARCH_TYPE = Object.freeze({
  LOG: 'log',
  COMMENT: 'comment',
});

const searchType = ref(SEARCH_TYPE.LOG);

const {t} = useI18n();

const searchOption = [
  //   '日志内容'
  { text: t('search.logTypeTitle'), value: SEARCH_TYPE.LOG},
  //   '备注'
  { text: t('search.commentTypeTitle'), value: SEARCH_TYPE.COMMENT },
];

const searchContent = ref("");

const store = inject(LogStoreKey);

const logs = ref([]);

async function onSearch() {
  if (searchType.value === SEARCH_TYPE.LOG) {
    logs.value = await store.searchLogsByLog(searchContent.value);
  } else if (searchType.value === SEARCH_TYPE.COMMENT) {
    logs.value = await store.searchLogsByComment(searchContent.value);
  }

  console.log(logs.value);
}

let { onCellClick } = useCornLog(logs, store);
</script>

<template>
  <teleport to=".nav-teleport">
    <div class="nav-bar my-flex justify-between items-center px-2">
      <van-dropdown-menu>
        <van-dropdown-item v-model="searchType" :options="searchOption" />
      </van-dropdown-menu>

      <van-search
          class="nav-bar__search grow rounded-r-full overflow-hidden"
          v-model="searchContent"
          shape="round"
          :placeholder="t('search.searchPlaceholder')"
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
        {{ t('search.searchBtnText') }}
      </van-button>
    </div>
  </teleport>

  <div class="search-view view">
    <corn-space :height="10" />

    <ul>
      <li v-for="(item, index) in logs" @click="onCellClick(item)">
        <corn-log :item="item"/>
      </li>
    </ul>

<!--    "无搜索结果"-->
    <van-empty v-if="logs.length === 0" image="search" :description="t('search.emptyDescription')" />
  </div>
</template>

<style scoped>
.nav-bar {
  --van-dropdown-menu-title-text-color: var(--van-primary-color);
  background: var(--van-background-2);
  --van-search-label-padding: 0px 0px;
  /* 上、右、下、左 */
  --van-search-padding: 10px 8px 10px 0px;

  :deep(.van-dropdown-menu__title::after) {
    display: none;
  }

  .nav-bar__search {
    margin-right: -2px;
  }
}
</style>
