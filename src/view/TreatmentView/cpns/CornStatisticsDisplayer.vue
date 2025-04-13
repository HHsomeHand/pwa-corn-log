<script setup lang="ts">
import {LogStoreKey} from "@/injectionKeys.ts";
import cornMitt from "@/mitt/mitt.ts";
import {useListUpdate} from "@/hooks/useListUpdate.ts";

let store = inject(LogStoreKey);

interface HourEntry {
  timeRange: string,
  count: number
}

const hourArr = ref<HourEntry[]>([]);

async function updateHourArr() {
  const tmpHourArr = await store.getAllLogsByHour();

  // 转换为指定格式的对象数组
  hourArr.value = tmpHourArr.map((count, index) => {
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

useListUpdate(updateHourArr);
</script>

<template>
  <template v-if="hourArr.length > 0">
    <van-divider>统计 · 频率</van-divider>
    <van-cell-group inset>
      <van-cell
          v-for="item in hourArr"
          :title="item.timeRange"
          :value="item.count"
      />
    </van-cell-group>
  </template>
</template>

<style scoped>

</style>