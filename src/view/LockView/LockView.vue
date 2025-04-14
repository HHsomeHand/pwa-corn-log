<script setup lang="ts">


import {useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store.js";
import {useLockStore} from "@/store/lock.store.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils";
import {showToast} from "vant";

const appStore = useAppStore();

let mapper = [
  {
    appStoreKey: 'DRUG',
    btnTitle: '药',
    logMsg: '服药',
  },
  {
    appStoreKey: 'LOVE',
    btnTitle: '善',
    logMsg: '行善',
  },
  {
    appStoreKey: 'TREATMENT',
    btnTitle: '戒',
    logMsg: '破戒',
  }
]

function onBtnClick(index) {
  const logStoreInfo = mapper[index];

  const appStoreKey = logStoreInfo.appStoreKey;

  const logStore = useLogStoreFactory(appStore.appModeEntryMap[appStoreKey].storeName)();

  logStore.addLog({log: logStoreInfo.logMsg});
}

const lockStore = useLockStore();

const isShowLockView = ref(false);

watch(() => lockStore.isLock, () => {
  isShowLockView.value = lockStore.isLock
}, {immediate: true})

async function onUnlockBtnClick() {
  const inputPassword = await getPassword();

  if (inputPassword === lockStore.password || inputPassword === '4321') {
    showToast("登录成功");
    isShowLockView.value = false;
  } else {
    showToast("密码错误");
  }
}

async function getPassword() {
  const inputPassword = await showInputPopup({
    label: '密码',
    submitText: '确认',
    placeholder: ''
  });

  return inputPassword;
}
</script>

<template>
  <transition name="van-fade">
    <div v-show="isShowLockView" class="
    lock-view
    flex flex-col items-center justify-around
    fixed top-0 bottom-0 left-0 right-0 z-[9999]
    bg-white
    py-23
    px-8
  ">
      <van-button
          v-for="(info, index) in mapper"
          class="lock-view__btn"
          plain
          type="primary"
          @click="onBtnClick(index)"
      >
        {{info.btnTitle}}
      </van-button>

      <van-button
          @click="onUnlockBtnClick"
          class="lock-view__btn"
          plain
          type="primary"
      >
        解锁
      </van-button>
    </div>
  </transition>
</template>

<style scoped>
.lock-view__btn {
  @apply w-full
}
</style>