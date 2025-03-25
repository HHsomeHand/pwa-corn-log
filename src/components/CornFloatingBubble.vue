<script setup>
import {onMounted} from "vue";

const props = defineProps({
  gap: {
    type: Number,
    default: 24
  },
  size: {
    type: Number,
    default: 48
  },
  container: {
    type: Object,
    default: () => document.body
  },
  posX: {
    type: String,
    default: 'right'
  },
  posY: {
    type: String,
    default: 'bottom'
  }
});

const themeVars = reactive({
  floatingBubbleSize: `${props.size}px`,
});

/**
 * 生成一个随机的类名
 * @param {string} [prefix='el'] - 类名前缀，默认为 'el'
 * @param {number} [length=8] - 随机部分的长度，默认为 8
 * @returns {string} 随机生成的类名
 */
function generateRandomClassName(prefix = 'el', length = 8) {
  // 定义随机字符的字典
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  // 生成指定长度的随机字符串
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  // 返回前缀 + 随机字符串
  return `${prefix}-${randomString}`;
}

const randomClassName = generateRandomClassName('bubble');

const offset = ref({ x: -1, y: -1 }); // 初始位置交给组件计算

watch(() => props.container, () => {
  
})

// 计算父元素边界并限制 offset
function restrictOffsetToContainer({ x, y }) {
  if (!props.container) return { x, y };

  const bubbleEl = document.querySelector(`.${randomClassName}`);
  const containerEl = props.container instanceof HTMLElement
      ? props.container
      : props.container.$el;

  // 获取父元素边界
  const rect = containerEl.getBoundingClientRect();
  const minX = rect.left + props.gap; // 左边界
  const maxX = rect.right - props.size - props.gap; // 右边界
  const minY = rect.top + props.gap; // 上边界
  const maxY = rect.bottom - props.size - props.gap; // 下边界

  // 限制 x 和 y 在父元素范围内
  const restrictedX = Math.max(minX, Math.min(maxX, x));
  const restrictedY = Math.max(minY, Math.min(maxY, y));

  return { x: restrictedX, y: restrictedY };
}

// 当 offset 变化时，检查并限制位置
function onOffsetChange(newOffset) {
  const restrictedOffset = restrictOffsetToContainer(newOffset);

  // 如果位置被限制，更新 offset
  if (restrictedOffset.x !== newOffset.x || restrictedOffset.y !== newOffset.y) {
    nextTick(() => {
      offset.value = restrictedOffset; // 更新位置，确保不越界
    });
  }
}

// 监听 offset 变化
watch(offset, (newVal) => {
  onOffsetChange(newVal);
}, { deep: true });

onMounted(() => {
  onOffsetChange(offset.value);
})
</script>

<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    <van-floating-bubble
        v-model:offset="offset"
        :class="randomClassName"
        axis="xy"
        icon="plus"
        magnetic="x"
        :gap="gap"
        @offset-change="onOffsetChange"
    />
  </van-config-provider>
</template>

<style scoped>

</style>