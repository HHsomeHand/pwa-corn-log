import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router, {setupRouterWithStore} from './router/index.js'
import {Quasar} from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'


import VueVirtualScroller from 'vue-virtual-scroller'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// https://github.com/Akryum/vue-virtual-scroller/blob/master/packages/vue-virtual-scroller/README.md
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// 防止 showToast 没有样式: https://juejin.cn/post/7244335987576733752
import 'vant/lib/index.css';


import {createPinia} from 'pinia'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)

app.use(pinia)

setupRouterWithStore();

app.use(router)
app.use(VueVirtualScroller)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
})


app.mount('#app')
