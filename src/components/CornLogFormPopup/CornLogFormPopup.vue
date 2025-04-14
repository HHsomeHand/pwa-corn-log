<script setup>
import {generateEntry, getDefaultValue} from "@/components/CornLogFormPopup/utils.ts";
import {COMMENT_ENTRY, DEFAULT_ENTRIES, LOG_ENTRY} from "@/components/CornLogFormPopup/const.js";
import CornDateSelectButton from "@/components/CornLogFormPopup/cpn/CornDateSelectButton.vue";
import {ENTRY_TYPE} from "@/components/CornLogFormPopup/ENTRY_TYPE.ts";

const modifyTime = ref(false);

const showPopup = ref(false);

const themeVars = reactive({
  overlayBackground: 'rgba(0, 0, 0, 0.1)',
});

// 下面用 id 代替了 clean
// let isEnableClean = false;
// let isClean = false;

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
  // if (isClean && isEnableClean) {
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

    if (entry.isReturnSubmit) {
      watch(entry.content, (newValue) => {
        if (newValue.includes("\n")) {
          entry.content.value = newValue.replaceAll("\n", "");
          onSubmit();
        } // END if (entry.content.value.includes("\n"))
      }) // END watch(entry.content, () => {
    }
  }

  return tmpEntries;
}

let this_id = 0;

const submitText = ref("记录!");

const fieldRefs = ref([]);

defineExpose({
  showPopup: (callback, {
    entries: _entries = {
      ...DEFAULT_ENTRIES
    },
    id = null,
    submitText: _submitText = "记录!"
  } = {}) => {
    // 如果 id 为 null, 就刷新
    if (!id || id !== this_id) {
      fieldRefs.value = [];

      entries.value = generateEntries(_entries);

      this_id = id;
    }
    submitText.value = _submitText;
    showPopup.value = true
    resolveCallback = callback
    // isEnableClean = _isEnableClean;

    // 设置自动聚焦
    const stop =watch(fieldRefs, () => {
      nextTick(() => {
        fieldRefs.value[0]?.focus?.();
        if (fieldRefs.value[0]) {
          stop();
        }
      })
    }, {deep: true});
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
                  :ref="el => fieldRefs.push(el)"
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
              {{ submitText }}
            </van-button>
          </div>
        </template>
      </van-popup>
    </van-config-provider>
  </teleport>

</template>

<style scoped>

</style>