<script setup>
import { vScroll } from '@vueuse/components'
import {useLogStore} from "@/store/logs.store.js";
import {
  canScroll,
  fmtDate,
  getDomElement,
  getTotalHeightUntilSeparator,
  isSameDay,
  stripTime,
  vh2px
} from "@/utils/index.js";
import {useUpdateLogs} from "@/hooks/updateLogs.hook.js";
import {closeToast, showLoadingToast, showToast} from "vant";
import CornTimeDisplayer from "@/components/CornTimeDisplayer.vue";
import {showLogFormPopup} from "@/components/CornLogFormPopup/utils.js";
import {COMMENT_ENTRY, DEFAULT_ENTRIES, ENTRY_TYPE, LOG_ENTRY} from "@/components/CornLogFormPopup/const.js";
import CornLog from "@/components/CornLog/CornLog.vue";
import {useCornLog} from "@/components/CornLog/hook.js";
import {showActionSheet} from "@/components/CornActionSheet/utils.js";
import {showCheckboxPopup} from "@/popup/CornCheckboxPopup/utils.js";

const logsCache = ref([])

const store = useLogStore()

const scrollerRef = ref(null)

const {isEnd, onScroll, updateToDate, update} = useUpdateLogs(scrollerRef, store, logsCache);

// 让体内元素可以滚动
onMounted(async () => {
  const scrollerEl = getDomElement(scrollerRef.value);

  while (!canScroll(scrollerEl) && !isEnd.value) {
    await update();
  }

  await nextTick(() => {
    scrollerEl.scrollTop = scrollerEl.scrollHeight; // 滚动到底部
  })
});

function toBottom() {
  if (!scrollerRef.value) return;
  const scrollerEl = getDomElement(scrollerRef.value);
  scrollerEl.scrollTo({
    top: scrollerEl.scrollHeight,
    behavior: 'smooth'
  });
}

async function scrollToDate(date) {
  if (!scrollerRef.value) return;

  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '加载中',
  });

  await updateToDate(date);

  const targetDate = new Date(date);

  let targetDateFmt = fmtDate(targetDate);

  const scrollerEl = getDomElement(scrollerRef.value);

  // 是否是就近查找
  let isClose = false;

  let targetEl;

  let _targetDate = new Date(targetDate);

  closeToast();

  do {
    let _targetDateFmt = fmtDate(_targetDate);

    // console.log(_targetDateFmt);

    // 查找对应日期的 DOM 元素
    targetEl = scrollerEl.querySelector(`[data-date="${_targetDateFmt}"]`);

    if (!targetEl) {
      // 如果没有早到, 就向前查找, 如果向后查早, 可能条目还没 update 出来
      _targetDate.setDate(_targetDate.getDate() + 1);

      // 如果传递的时间小于最早的时间, 那就使用最早的时间
      let endEntry = logsCache.value[0];
      if (endEntry.type === "end"
          && _targetDate.getTime() < endEntry.date.getTime()) {
        _targetDate = endEntry.date;
      }

      let lastEntry = logsCache.value[logsCache.value.length - 1];
      if (_targetDate.getTime() > lastEntry?.date?.getTime?.()) {
        _targetDate = lastEntry.date;
      }

      isClose = true;
    } else {
      if (isClose) {
        showToast(`未找到日期 ${targetDateFmt} 的日志项, 已就近查找 ${_targetDateFmt}`)
      }
      break;
    }
  } while (true);

  if (targetEl) {
    /**
     * block: 'start' 的作用
     * block 是 scrollIntoView 方法配置对象中的一个属性，它定义了元素在块级方向（通常是垂直方向）上的对齐方式。block: 'start' 意味着元素的顶部会与滚动容器的顶部对齐，这样元素会滚动到滚动容器可见区域的顶部位置。
     * 其他可选值如下：
     * 'end'：元素的底部会与滚动容器的底部对齐。
     * 'center'：元素会在滚动容器的垂直方向上居中显示。
     * 'nearest'：元素会尽可能少地滚动以进入可见区域，具体取决于元素当前相对于滚动容器的位置。
     */
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
      showToast(`未找到日期 ${targetDateFmt} 的日志项`);
  }
}

async function addEntry(logData) {
  let logEntry = await store.addLog(logData);
  logsCache.value.push(logEntry);
}

let updateOption =  {
  logsCache: logsCache.value,
  store
};

let {onCellClick: _onCellClick, updateEntry: _updateEntry } = useCornLog(logsCache, store);

function onCellClick(item) {
  return _onCellClick(item, updateOption);
}

function updateEntry(...args) {
  return _updateEntry(...args, updateOption);
}

const themeVars = reactive({
  cellValueColor: 'color-mix(in srgb, var(--van-cell-text-color) 70%, gray)',
  cellLabelColor: 'color-mix(in srgb, var(--van-cell-text-color) 50%, gray)',
});

function getDisplayDate(item) {
  return item.originalDate || item.date;
}

function onSeparatorClick() {
  showCheckboxPopup((checked) => {
    console.log(checked);
  }, {
    entries: [{
      name: 'date',
      text: '日期'
    }, {
      name: 'log',
      text: '日志'
    }, {
      name: 'comment',
      text: '备注'
    }]
  });
}

defineExpose({
  toBottom,
  scrollToDate,
  addEntry,
  updateEntry,
})
</script>

<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global" />

  <div class="h-full flex flex-col">
    <ul ref="scrollerRef" class="overflow-auto" v-scroll="onScroll">

      <template v-for="(item, index) in logsCache">
        <li v-if="
            index > 0 && // 防止 index 为 0, 访问下标为 -1 的元素
            stripTime(getDisplayDate(logsCache[index - 1])).getTime()
              !== stripTime(getDisplayDate(item)).getTime()
            "
            :data-date="fmtDate(getDisplayDate(item))"
            data-type="separator"
            @click="onSeparatorClick"
        >
          <van-divider>{{fmtDate(getDisplayDate(item))}}</van-divider>
        </li>

        <li v-if="item.type==='end'">
          <van-divider>这里是日志的尽头</van-divider>
        </li>
        <li
            v-else
            :key="item.id + '' + item.date.getTime()"
            @click="onCellClick(item)"
        >
          <corn-log :item="item"/>
        </li>
      </template>

    </ul>
  </div>


</template>

<style scoped>

</style>