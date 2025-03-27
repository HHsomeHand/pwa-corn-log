import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueVirtualScroller from 'vue-virtual-scroller'

// 防止 showToast 没有样式: https://juejin.cn/post/7244335987576733752
import 'vant/lib/index.css';

// https://github.com/Akryum/vue-virtual-scroller/blob/master/packages/vue-virtual-scroller/README.md
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueVirtualScroller)

app.mount('#app')
