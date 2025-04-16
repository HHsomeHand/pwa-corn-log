<script setup lang="ts">
import {LogStoreKey} from "@/injectionKeys.ts";
import {useListUpdate} from "@/hooks/useListUpdate.ts";
import {showToast} from "vant";

let store = inject(LogStoreKey);

interface LogAndHourArr {
  log: string,
  hourArr: number[]
}

interface LogAndHourEntries {
  log: string,
  hourEntries: HourEntry[]
}

interface HourEntry {
  timeRange: string,
  count: number
}

const showData = ref<LogAndHourEntries[]>([]);

function hourArr2hourEntries(hourArr: number[]): HourEntry[] {
  return hourArr.map((count, index) => {
    const startHour = String(index).padStart(2, '0');
    const endHour = String((index + 1) % 24).padStart(2, '0');
    const timeRange = `${startHour}:01 - ${endHour}:00`;
    return { timeRange, count };
  })
  // 过滤掉值为0的项
  .filter((obj: HourEntry) => obj.count > 0)
  // 按值从大到小排序
  .sort((a: HourEntry, b: HourEntry) => b.count - a.count);
}

async function update() {
  const items: LogAndHourArr[] = await store.getLogsFrequencyByHour();

  showData.value = [];
  for (let item of items) {
    showData.value.push({
      log: item.log,
      hourEntries: hourArr2hourEntries(item.hourArr)
    });
  }
}

useListUpdate(update);

function onCellClick(log: string, item: HourEntry) {
  showToast(`${log}: ${item.timeRange} 频率为: ${item.count}`);
}
</script>

<template>
  <template v-if="showData.length > 0">
    <van-divider>统计 · 频率</van-divider>

    <template v-for="data of showData">
      <van-divider content-position="left">{{data.log}}</van-divider>

      <van-cell-group inset>
        <van-cell
            v-for="item in data.hourEntries"
            :title="item.timeRange"
            :value="item.count"
            @click="onCellClick(data.log, item)"
            clickable
        />
      </van-cell-group>
    </template>

    <corn-space :height="20" />
  </template>
</template>

<style scoped>

</style>
