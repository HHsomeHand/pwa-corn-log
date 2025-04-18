// main.ts
import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router, {setupRouterWithStore} from './router/index.js'

import VueVirtualScroller from 'vue-virtual-scroller'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// https://github.com/Akryum/vue-virtual-scroller/blob/master/packages/vue-virtual-scroller/README.md
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// Import Quasar css
// import 'quasar/src/css/index.sass'

// 防止 showToast 没有样式: https://juejin.cn/post/7244335987576733752
import 'vant/lib/index.css';


import {createPinia} from 'pinia'
import {i18n} from "@/i18n/index.js";
import {useI18n} from "vue-i18n";

const app = createApp(App)

app.use(i18n);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

setupRouterWithStore();

app.use(router)
app.use(VueVirtualScroller)

app.mount('#app')
