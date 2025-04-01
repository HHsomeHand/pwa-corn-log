<script setup>
import {generateEntry, getDefaultValue} from "@/components/CornLogFormPopup/utils.js";
import {COMMENT_ENTRY, DEFAULT_ENTRIES, ENTRY_TYPE, LOG_ENTRY} from "@/components/CornLogFormPopup/const.js";
import CornDateSelectButton from "@/components/CornLogFormPopup/cpn/CornDateSelectButton.vue";

const modifyTime = ref(false);

const showPopup = ref(false);

const themeVars = reactive({
  overlayBackground: 'rgba(0, 0, 0, 0.1)',
});

let isClean = false;

let resolveCallback = null;

const entries = ref({});
const this_entries = entries;

function onSubmit() {
  showPopup.value = false;

  // isClean = true;

  resolveCallback?.(getResult());
}

function getResult() {
  let result = {};

  const _entries = entries.value;

  for (const key in _entries) {
    // ref 内嵌 ref, 这里会自动解包, 不需要 .content.value
    result[key] = _entries[key].content;
  }

  return result;
}

function onClosed() {
  // if (isClean) {
  //   const _entries = entries.value;
  //
  //   for (const key in _entries) {
  //     let content = _entries[key].content;
  //
  //     _entries[key].content = getDefaultValue(content);
  //   }
  //   isClean = false;
  // }

  resolveCallback?.(null);
}

function generateEntries(entries) {
  let tmpEntries = {
    ...entries
  }

  for (const key in tmpEntries) {
    const entry = tmpEntries[key];

    entry.content = ref(entry.defaultVal);
  }

  return tmpEntries;
}

let this_id = 0;
defineExpose({
  showPopup: (callback, {
    entries = {
      ...DEFAULT_ENTRIES
    },
    id = null
  } = {}) => {
    // 如果 id 为 null, 就刷新
    if (!id || id !== this_id) {
      this_entries.value = generateEntries(entries);
      this_id = id;
    }
    showPopup.value = true
    resolveCallback = callback
  }
})
</script>

<template>
  <teleport to="body">
    <van-config-provider :theme-vars="themeVars">
      <van-popup
          v-model:show="showPopup"
          closeable
          round
          position="bottom"
          class="h-auto py-2"
          @closed="onClosed"
      >
        <template #default>
          <div class="flex flex-col gap-2">
            <template v-for="entry in entries">
              <van-field
                  v-if="entry.type === ENTRY_TYPE.STR"
                  v-model="entry.content"
                  rows="1"
                  autosize
                  :label="entry.label"
                  type="textarea"
                  :placeholder="entry.placeholder"
                  class="!pr-12"
              />

              <corn-date-select-button
                  :key="entry.content.getTime()"
                  v-else-if="entry.type === ENTRY_TYPE.DATE"
                  v-model="entry.content"
              />
            </template>
            <van-button
                class="flex-shrink-0 popup-btn"
                plain
                type="primary"
                @click="onSubmit"
            >
              记录!
            </van-button>
          </div>
        </template>
      </van-popup>
    </van-config-provider>
  </teleport>

</template>

<style scoped>

</style>