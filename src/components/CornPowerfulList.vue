<script setup>
import { vScroll } from '@vueuse/components'
import {useLogStore} from "@/store/logs.store.js";
import {useEventListener, useScroll} from "@vueuse/core";
import {throttle} from "underscore";
import {fmtDate, getDomElement, vh2px} from "@/utils/index.js";

const logsCache = ref([])

const store = useLogStore()

let oldestDate;
// 一直获取
// 到末尾就返回[]
async function _getLogs(date) {
  date = new Date(date);

  let logs = [];

  if (!oldestDate) {
    oldestDate = await store.getOldestDate();
    if (!oldestDate) {
      oldestDate = new Date();
    }
  }

  do {
    console.log("获取日期:" + fmtDate(date));

    logs = await store.getLogsByDate(date);

    date.setDate(date.getDate() - 1);

    if (date.getTime() < oldestDate.getTime()) {
      break;
    }
  } while (logs.length === 0);


  return logs;
}

async function _getLogsWithSeparator(date) {
  let logs = [];

  logs = await _getLogs(date);

  if (logs.length !== 0) {
    logs.unshift(generatorSeparator(date));
  }

  return logs;
}

function generatorSeparator(date) {
  date = new Date(date);

  return {
    type: "separator",
    content: date.toISOString().split("T")[0],
    date: date
  }
}

// 初始化日志缓存, 不带分隔符
async function initLogs() {
  let logs = await _getLogs(new Date());

  logsCache.value.push(...logs);
}

let _update = () => {};

// TODO: 删掉
async function onClick() {
  // store.generateTestData();
  _update();
}

const scrollerRef = ref(null)

let stopTouchStart = () => {};

let stopTouchMove = () => {};

onUnmounted(() => {
  stopTouchStart();

  stopTouchMove();
})

onMounted(async () => {
  const scrollerEl = getDomElement(scrollerRef.value);

  async function init() {
    await initLogs();

    await nextTick(() => {
      scrollerEl.scrollTop = scrollerEl.scrollHeight; // 滚动到底部
    });
  }

  await init();

  // 实现触顶刷新
  async function enableTopUpdate() {
    const { arrivedState } = useScroll(scrollerEl);

    const { top: isTop} = toRefs(arrivedState);

    let startY = 0;

    let isAtTopOnTouchStart;
    stopTouchStart = useEventListener(scrollerEl, 'touchstart', (event) => {
      startY = event.touches[0].pageY;

      isAtTopOnTouchStart = isTop.value;
    });

    stopTouchMove = useEventListener(scrollerEl, 'touchmove', (event) => {
      const currentY = event.touches[0].pageY;
      const deltaY = currentY - startY;

      // 只在顶部且向下拖动超过阈值时阻止默认行为
      if (isAtTopOnTouchStart && deltaY > 0) {
        event.preventDefault();
      }

      onScroll(deltaY);
    },  { passive: false });

    const onScroll = throttle((deltaY) => {
      if (deltaY < 0) {
        // 向上拖动会到这里, 这里要向下拖动才加载 logs
        return;
      }

      // 如果不在顶部, 就不做处理
      if (!isTop.value) {
        return;
      }

      // console.log("逻辑");
      _update();

    }, 500);
  }

  await enableTopUpdate();

  _update = async () => {
    let date = new Date(logsCache.value[0].date);

    if (logsCache.value[0].type !== "separator") {
      logsCache.value.unshift(generatorSeparator(date));
    }

    date.setDate(date.getDate() - 1);

    let logs = await _getLogsWithSeparator(date);

    const prevScrollTop = scrollerEl.scrollTop;
    const prevScrollHeight = scrollerEl.scrollHeight;

    logsCache.value.unshift(...logs);

    function setScrollPos() {
      // 计算新内容的增量高度
      const heightDelta = scrollerEl.scrollHeight - prevScrollHeight;
      // 保持用户视角不变：原偏移 + 新增高度
      scrollerEl.scrollTop = prevScrollTop + heightDelta;
    }

    await nextTick(() => {
      setScrollPos();
    });
  }
});

function onScroll(state) {
  let {y} = state;

  if (y.value < vh2px(50)) {
    // console.log("逻辑");
    _update();
  }
}

// 渲染时动态分隔
// const getSeparator = (index) => {
//   if (index === 0) return null;
//
//   const currentDate = logsCache.value[index]?.date;
//   if (!currentDate) return null;
//
//   const prevDate = logsCache.value[index - 1]?.date;
//   if (!prevDate) return null;
//
//   return currentDate?.getTime?.() !== prevDate?.getTime?.() ? currentDate : null;
// };
</script>

<template>
  <div class="h-full flex flex-col">
    <button @click="onClick">
      click me
    </button>
    <ul ref="scrollerRef" class="overflow-auto" v-scroll="onScroll">
      <template v-for="item in logsCache">
        <template v-if="item.type==='separator'">
          <li>separator {{fmtDate(item.date)}}</li>
        </template>
        <template v-else>
          <li class="item">
            {{ item.log + fmtDate(item.date)}}
          </li>
        </template>
      </template>

    </ul>
  </div>
</template>

<style scoped>
.item {
  border: 5px solid #ccc;
  height: 200px;
  margin: 20px;
}
</style>