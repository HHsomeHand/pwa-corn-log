<script setup>
import {generateEntry, getDefaultValue} from "@/components/CornLogFormPopup/utils.js";
import {COMMENT_ENTRY, DEFAULT_ENTRIES, LOG_ENTRY} from "@/components/CornLogFormPopup/const.js";

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

  isClean = true;

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
  if (isClean) {
    const _entries = entries.value;

    for (const key in _entries) {
      let content = _entries[key].content;

      _entries[key].content = getDefaultValue(content);
    }
    isClean = false;
  }

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

defineExpose({
  showPopup: (callback, {
    entries = {
      ...DEFAULT_ENTRIES
    }
  } = {}) => {
    this_entries.value = generateEntries(entries);
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
          class="h-[30%] h-auto pt-2"
          @closed="onClosed"
      >
        <template #default>
          <div class="flex flex-col">
            <template v-for="entry in entries">
              <van-field
                  v-model="entry.content"
                  rows="1"
                  autosize
                  :label="entry.label"
                  type="textarea"
                  :placeholder="entry.placeholder"
                  class="!pr-12"
              />
            </template>
            <van-button
                class="flex-shrink-0 !m-2"
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