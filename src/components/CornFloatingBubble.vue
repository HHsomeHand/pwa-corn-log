<script setup>
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


let axis = ref("xy");

let tmpX;
let tmpY;
function onOffsetChange({x, y}) {
  if (!props.container) { return; }
  const bubbleEl = document.querySelector(`.${randomClassName}`);
  const containerEl = props.container instanceof HTMLElement ?
      props.container : props.container.$el;

  let rect = containerEl.getBoundingClientRect();
  const isOutside =
      x - props.gap < rect.left ||
      y - props.gap < rect.top ||
      x + props.gap + props.size > rect.right ||
      y + props.gap + props.size > rect.bottom;



  if (isOutside && tmpX !== x && tmpY !== y) {
    tmpX = x;
    tmpY = y;

    // 让浮动泡泡不超出父元素的范围
    // console.log(isOutside);
    // // 创建 touchEnd 事件
    // const touchEndEvent = new TouchEvent('touchcancel', {
    //   bubbles: false,
    //   cancelable: true
    // });
    //
    // // 触发 touchEnd 事件
    // bubbleEl.dispatchEvent(touchEndEvent);
    //
    // axis.value = "lock";
    // setTimeout(() => {
    //   axis.value = "xy";
    // }, 1000);
  }
}

const offset = ref({ x: -1, y: -1 });

watch(offset, () => {
  onOffsetChange(offset.value);
})

</script>

<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    <van-floating-bubble
        v-model:offset="offset"
        :class="randomClassName"
        :axis="axis"
        icon="plus"
        magnetic="x"
        :gap="gap"

    />
  </van-config-provider>
</template>

<style scoped>

</style>