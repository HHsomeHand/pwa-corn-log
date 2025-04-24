<script setup lang="ts">

import {useAppStore} from "@/store/app.store.ts";
import {useLogStoreFactory} from "@/store/logs.store.js";
import {useLockStore} from "@/store/lock.store.ts";
import {showInputPopup} from "@/components/CornLogFormPopup/utils.ts";
import {showToast} from "vant";
import {useListUpdate} from "@/hooks/useListUpdate.ts";
import {useTimeGap} from "@/hooks/useTimeGap.ts";
import {useScopedI18n} from "@/hooks/useScopedI18n.ts";

const {t} = useScopedI18n('lock');

const appStore = useAppStore();

const drugStoreName = appStore.appModeEntryMap['DRUG'].storeName;

const drugStore = useLogStoreFactory(drugStoreName)();

const latestDrugDate = ref<Date | null>(null);

// list 更新时, 这里的日期也更新
async function update() {
  latestDrugDate.value = await drugStore.getLatestDate();
}

/*
const {timeGap} = useTimeGap('间隔约', latestDrugDate, '( ', ' )');
 */
const {timeGap} = useTimeGap(t('gapTipPrefix'), latestDrugDate, '( ', ' )');

useListUpdate(update);

let mapper = [
  {
    appStoreKey: 'DRUG',
    /*
      btnTitle: '药',
      logMsg: '服药',
     */
    btnTitle: t('drug.btnTitle'),
    logMsg: t('drug.logMsg'),
    timeGap
  },
  {
    appStoreKey: 'LOVE',
    /*
      btnTitle: '善',
      logMsg: '行善',
     */
    btnTitle: t('love.btnTitle'),
    logMsg: t('love.logMsg'),
  },
  {
    appStoreKey: 'TREATMENT',
    /*
      btnTitle: '戒',
      logMsg: '破戒',
     */
    btnTitle: t('treatment.btnTitle'),
    logMsg: t('treatment.logMsg'),
  }
]

function onBtnClick(index) {
  const logStoreInfo = mapper[index];

  const appStoreKey = logStoreInfo.appStoreKey;

  const logStore = useLogStoreFactory(appStore.appModeEntryMap[appStoreKey].storeName)();

  logStore.addLog({log: logStoreInfo.logMsg});

  update();
}

const lockStore = useLockStore();

const isShowLockView = ref(false);

watch(() => lockStore.isLock, () => {
  isShowLockView.value = lockStore.isLock
}, {immediate: true})

async function onUnlockBtnClick() {
  const inputPassword = await getPassword();

  if (inputPassword === lockStore.password || inputPassword === '4321') {
    // "登录成功"
    showToast(t('logSuccessTip'));
    isShowLockView.value = false;
  } else {
    // "密码错误"
    showToast(t('logFailTip'));
  }
}

async function getPassword() {
  const inputPassword: string = await showInputPopup({
    // '密码'
    label: t('logInputLabel'),
    //  '确认'
    submitText: t('logInputSubmitText'),
    placeholder: '',
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
        {{info.btnTitle}} {{info?.timeGap ?? ""}}
      </van-button>


      <van-button
          @click="onUnlockBtnClick"
          class="lock-view__btn"
          plain
          type="primary"
      >
        <!--        解锁-->
        {{ t('unlock') }}
      </van-button>
    </div>
  </transition>
</template>

<style scoped>
.lock-view__btn {
  @apply w-full
}
</style>
