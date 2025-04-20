<script setup>


const showPopup = ref(false);

let resolveCallback = null;

const entries = ref({});

const checkboxRefs = ref([]);

const checked = ref([]);

function onSubmit() {
  showPopup.value = false;

  resolveCallback?.(checked.value);
}

function onClosed() {
  resolveCallback?.(null);
}

const submitText = ref("");

const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};

defineExpose({
  showPopup: (callback, {
    entries: _entries = [{name: "name", text: "测试数据"}],
    submitText: _submitText = ""
  } = {}) => {
    entries.value = _entries;
    submitText.value = _submitText;

    showPopup.value = true
    resolveCallback = callback
  }
})
</script>

<template>
  <teleport to="body">
      <van-popup
          v-model:show="showPopup"
          round
          position="bottom"
          class="corn-popup h-auto py-2"
          @closed="onClosed"
      >
        <template #default>
          <div class="flex flex-col gap-2">
            <van-checkbox-group class="flex flex-col items-center" v-model="checked">
              <van-cell
                  v-for="(entry, index) in entries"
                  clickable
                  :key="entry.name"
                  :title="entry.text"
                  @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox
                      :name="entry.name"
                      :ref="el => checkboxRefs[index] = el"
                      @click.stop
                  />
                </template>
              </van-cell>
            </van-checkbox-group>

            <van-button
                class="!block flex-shrink-0 px-2 popup-btn"
                plain
                type="primary"
                @click="onSubmit"
            >
              {{submitText}}
            </van-button>
          </div>
        </template>
      </van-popup>
  </teleport>

</template>

<style scoped>
.corn-popup {
  --van-checkbox-label-color: var(--van-primary-color);
}
</style>
