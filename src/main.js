import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 防止 showToast 没有样式: https://juejin.cn/post/7244335987576733752
import 'vant/lib/index.css';

const app = createApp(App)

app.use(router)

app.mount('#app')
