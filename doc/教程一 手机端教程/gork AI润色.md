## 如何快速开发一款App？PWA是你的答案

想快速开发一款可以在手机或电脑上运行的App，但不想深陷原生开发的复杂性或小程序的限制？**PWA（Progressive Web App，渐进式网页应用）**可能正是你需要的解决方案！本文将通过Vue3、Vant、Tailwind CSS v4和PWA技术，带你一步步打造一个支持离线使用、可添加到桌面的轻量级App。本教程面向有一定Vue3和Git基础的开发者，同时为新手提供学习资源，力求通俗易懂且实用。

> **注意**：
>
> 本文中引用的文档链接仅供参考，无需逐字研读。技术文档追求全面而非通俗，晦涩难懂是常态。试图通过阅读文档学习技术，就像通过查新华字典学习中文，效率不高。本教程将带你通过实践快速上手，轻松掌握PWA开发！

---

### 一、准备工作：知识储备与资源推荐

在开始之前，你需要以下基础知识。如果你是新手，可以通过推荐资源快速入门。

#### 1. 必备技能
- **Vue3**
- **Git**：了解Git的基本操作（如`git add`、`git commit`、`git push`），用于代码版本管理。推荐书籍《跟Wakaba酱一起学Git使用》（https://book.douban.com/subject/35274988/），或B站尚硅谷的Git教程，1-2小时可上手。
- **前端基础**：掌握HTML、CSS、JavaScript，尤其是CSS的flex布局。

> Git就像单机游戏的存档功能，可以随时保存你的代码进度。每当你完成一段功能或准备进行重大修改时，可以通过git commit创建一个“存档点”（提交），例如标记为“WIP”（Work In Progress，工作中）以记录当前状态。这样，无论是代码出错还是需要回退到之前的版本，Git都能帮助你快速回溯，保护开发成果。

#### 2. 推荐资源
- **Git**：B站尚硅谷Git教程，或《跟Wakaba酱一起学Git使用》（孔夫子旧书网二手书9.9元包邮，淘宝多为中间商，价格偏高）。
- **PWA**：B站黑马程序员PWA教程（https://www.bilibili.com/video/BV1wt411E7QD），讲解清晰；或《PWA入门与实践》（孔夫子旧书网购，9.9元包邮）。
- **Tailwind CSS**：菜鸟教程（https://www.runoob.com/tailwindcss/tailwindcss-tutorial.html），简洁直观。若CSS转Tailwind不熟悉，可询问AI（如豆包）快速查询对应写法。

#### 3. 开发环境
- **Node.js**：安装最新版，包含npm。
- **pnpm**：高效的包管理工具，优于npm，安装命令：
  ```bash
  npm install -g pnpm
  ```
- **编辑器**：推荐VSCode（Tailwind插件由官方维护）或WebStorm（非商业免费，但Tailwind插件体验稍差）。
- **浏览器**：手机端仅Chrome对PWA支持正常，Edge的navbar会与系统状态栏重合，tabbar会与底部导航键冲突，Firefox输入适配不佳。

---

### 二、PWA技术解析：是什么？适合谁？

#### 1. PWA的核心特性
PWA是一种基于H5的技术，让网页具备原生App的部分功能：
- **添加到桌面**：用户可将网页“安装”到桌面，隐藏浏览器地址栏，体验接近原生App。
- **离线运行**：通过Service Worker缓存资源，支持断网访问。
- **绕过应用商店分发**：部署到HTTP服务器（如Nginx或GitHub Pages），通过浏览器分发，无需上架应用商店。
- **高效开发**：基于H5开发，效率高，适合工具类、非商业App。

#### 2. PWA的适用场景
PWA是快速开发轻量级App的理想选择，尤其适合：
- 个人项目或开源工具（如记事本、计算器）。
- 不依赖复杂系统API的场景。
- 需要快速验证创意的原型开发。

但PWA并非万能银弹：
- **局限性**：受浏览器沙盒限制，无法调用操作系统API（如操作其他应用窗口），不适合需要深度系统集成的App。
- **调试复杂**：手机与电脑的端口映射需额外配置（后文详述）。
- **浏览器兼容性**：国内用户常使用自带浏览器，兼容性参差不齐。手机端仅Chrome显示和功能正常，Edge的navbar与系统状态栏重合，tabbar与底部导航键冲突，Firefox效果不佳。

#### 3. PWA vs 小程序
PWA无法完全替代小程序。小程序依托微信的流量入口和支付接口，适合商业化场景，但开发繁琐、上架需付费，且审核严格。PWA则更自由，无需上架，适合独立开发者，但无法像小程序那样深度集成微信生态。

#### 4. 为什么PWA在国内不流行？
- **隐私限制**：PWA无法像原生App那样读取用户App列表或构建用户画像，商业化潜力受限。
- **广告限制**：无法实现开屏摇一摇广告，广告还可能被浏览器扩展（如AdBlock）屏蔽。
- **H5性能**：H5的渲染引擎较原生App臃肿，性能稍逊。Flutter等框架因自带渲染引擎性能更优，但国内多采用H5与原生混合开发，性能非主要瓶颈。
- **浏览器不可控**：国内用户多用自带浏览器，PWA兼容性受限。Chrome下载PWA需梯子（因依赖Google Play服务），Edge和Firefox体验不佳。

对于开源、无广告的轻量级App，这些问题影响较小，PWA依然是高效选择。

---

### 三、动手实践：打造一个PWA手机App

我们将使用Vue3、Vant、Tailwind CSS v4和PWA技术，创建一个带导航栏、内容区域和底部标签栏的Demo，支持离线运行和桌面安装。

#### 1. 创建Vue3项目
使用Vite快速搭建项目：
1. 打开终端（文件夹右键“在终端中打开”或地址栏输入`cmd`）：
   ```bash
   pnpm create vue
   ```
2. 项目命名为`pwa-mobile-demo`，选择`Vue`、`JavaScript`，勾选`Vue Router`和`Pinia`，其他默认。
3. 初始化完成后：
   ```bash
   cd pwa-mobile-demo
   pnpm install
   pnpm dev
   ```
4. 浏览器打开`http://localhost:5173`，看到Vue默认页面说明成功。

#### 2. 清理项目
删除多余文件：
- 清空`src/assets/main.css`。
- 删除`src/components`下所有文件。
- 删除`src/views/About.vue`。
- 修改`src/router/index.js`，仅保留首页路由，并使用Hash模式（部署更简单）：
  ```js
  import { createRouter, createWebHashHistory } from 'vue-router'
  import HomeView from '../views/HomeView.vue'
  
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), // 修改为 Hash 模式
    routes: [
      { path: '/', name: 'home', component: HomeView }
    ]
  })
  
  export default router
  ```
- 清空`src/views/HomeView.vue`模板：
  ```vue
  <script setup></script>
  <template></template>
  <style scoped></style>
  ```
  运行`pnpm dev`，确保页面正常（可能空白）。

#### 3. 集成PWA功能
PWA通过Service Worker实现离线缓存，我们使用`vite-plugin-pwa`（基于Workbox）简化配置。

##### 什么是Service Worker？
Service Worker是基于Web Worker的独立线程，可拦截非Ajax网络请求（如HTML、CSS、JS、图片），并缓存到浏览器，实现离线访问。Workbox是对Service Worker的封装，50%以上的网站使用它（官网数据）。

>在浏览器环境中，JavaScript 是单线程运行的，但可以借助 Web Worker 启动新线程执行任务。Service Worker 基于 Web Worker，会单独开启一个线程。
>
>Service Worker 能够拦截除 Ajax 之外的所有网络请求，包括 HTML、CSS、JS 文件以及图片资源。在 Service Worker 中编写逻辑，可将这些资源缓存到浏览器，实现下次用户断网时，直接从缓存读取数据，从而达成 Web App 的离线访问。
>
>框架本质是对底层的封装，例如 Vue 封装了底层 DOM 操作，Workbox 则封装了底层 Service Worker 功能。
>
>workbox文档: https://web.dev/learn/pwa/workbox?hl=zh-cn

##### 配置Workbox

我们使用`vite-plugin-pwa`, 其底层是 workbox

> https://vite-pwa-org-zh.netlify.app/

1. 安装插件：
   ```bash
   pnpm add -D vite-plugin-pwa
   ```
2. 修改`vite.config.js`：
   ```js
   import { fileURLToPath, URL } from 'node:url'
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import { VitePWA } from 'vite-plugin-pwa'
   
   export default defineConfig({
     plugins: [
       vue(),
       VitePWA({
         registerType: 'autoUpdate',
         devOptions: { enabled: false },
         workbox: {
           globPatterns: ['**/*.{mjs,js,css,html,png,jpg,gif,svg,woff,woff2}']
         },
         manifest: false
       })
     ],
     resolve: {
       alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
       }
     },
     server: {
       host: '0.0.0.0',
       open: true
     }
   })
   ```
   **配置说明**：
   - `registerType: 'autoUpdate'`：服务器资源更新时，Service Worker自动接管页面。
   - `globPatterns`：缓存指定类型的文件，包括图片和字体，确保离线正常显示。
   - `devOptions: { enabled: false }`：避免开发模式下Workbox与热更新冲突。
   - `server.host: '0.0.0.0'`：允许手机通过IP访问开发服务器。

#### 4. 引入Vant组件库
Vant是轻量级移动端组件库，相比Vueitfy（中型）或Quasar（重型框架，含布局方案和工具库），更适合快速开发。

跟着官网配置就好了,  这里的重点就是要配置自动导入

> 官网配置教程: https://vant.pro/vant/#/zh-CN/quickstart

1. 安装Vant及自动导入插件：
   ```bash
   pnpm add vant
   pnpm add -D @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import
   ```
2. 更新`vite.config.js`：
   ```js
   import { fileURLToPath, URL } from 'node:url'
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import { VitePWA } from 'vite-plugin-pwa'
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { VantResolver } from '@vant/auto-import-resolver'
   
   export default defineConfig({
     plugins: [
       vue(),
       AutoImport({
         imports: ['vue'],
         resolvers: [VantResolver()]
       }),
       Components({
         resolvers: [VantResolver()]
       }),
       VitePWA({
         registerType: 'autoUpdate',
         devOptions: { enabled: false },
         workbox: {
           globPatterns: ['**/*.{mjs,js,css,html,png,jpg,gif,svg,woff,woff2}']
         },
         manifest: false
       })
     ],
     resolve: {
       alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
       }
     },
     server: {
       host: '0.0.0.0',
       open: true
     }
   })
   ```
3. 测试Vant，在`src/App.vue`写入：
   ```vue
   <script setup></script>
   <template>
     <van-button type="primary">主要按钮</van-button>
     <van-button type="success">成功按钮</van-button>
     <van-button type="default">默认按钮</van-button>
     <van-button type="danger">危险按钮</van-button>
     <van-button type="warning">警告按钮</van-button>
   </template>
   <style scoped></style>
   ```
   运行`pnpm dev`，看到以下界面说明成功：
   ![image-20250421230630026](./img/gork%20AI%E6%B6%A6%E8%89%B2/1.jpg)

#### 5. 集成Tailwind CSS v4
Tailwind CSS是一个原子化CSS框架，适合快速构建界面。

1. 安装Tailwind：
   ```bash
   pnpm add -D tailwindcss @tailwindcss/vite
   ```
2. 更新`vite.config.js`：
   ```js
   import { fileURLToPath, URL } from 'node:url'
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import { VitePWA } from 'vite-plugin-pwa'
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { VantResolver } from '@vant/auto-import-resolver'
   import tailwindcss from '@tailwindcss/vite'
   
   export default defineConfig({
     plugins: [
       vue(),
       tailwindcss(),
       AutoImport({
         imports: ['vue'],
         resolvers: [VantResolver()]
       }),
       Components({
         resolvers: [VantResolver()]
       }),
       VitePWA({
         registerType: 'autoUpdate',
         devOptions: { enabled: false },
         workbox: {
           globPatterns: ['**/*.{mjs,js,css,html,png,jpg,gif,svg,woff,woff2}']
         },
         manifest: false
       })
     ],
     resolve: {
       alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
       }
     },
     server: {
       host: '0.0.0.0',
       open: true
     }
   })
   ```
3. 在`src/assets/main.css`引入：
   ```css
   @import "tailwindcss";
   ```
4. 测试Tailwind，在`src/App.vue`写入：
   ```vue
   <script setup></script>
   <template>
     <div class="mx-auto mt-20 w-19 h-19 bg-blue-400 text-white">
       Hello Tailwind!
     </div>
   </template>
   <style scoped></style>
   ```
   运行`pnpm dev`，看到以下界面：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/2.jpg" alt="image-20250421234702874" style="zoom:50%;" />

**Tailwind注意事项**：
- Tailwind v4比v3更灵活，解决了粒度问题（如`p-96`直接支持）。
- Tailwind的教程推荐: 推荐通过菜鸟教程来学习（https://www.runoob.com/tailwindcss/tailwindcss-tutorial.html）。
- Quasar的flex工具类与Tailwind冲突，若在老项目引入Quasar可能导致布局崩溃。建议为Tailwind设置前缀（如`t-flex`）。
- Tailwind包含normalize.css和reset.css功能，统一浏览器默认样式。

#### 6. Git工作流
良好的Git习惯便于代码回溯和协作：
- **main分支**：记录大版本，保持干净。
- **dev分支**：日常开发，随手提交。
创建和切换分支：
```bash
git branch dev
git switch dev
```
查看分支：
```bash
git branch
```
提交代码：
<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/3.jpg" alt="image-20250421235107371" style="zoom: 50%;" />

#### 7. 搭建页面布局
App包含导航栏（NAV）、内容区域（Main）和底部标签栏（Tabbar）。

```
NAV 导航条

Main 内容区域

TABBAR 底部标签栏
```

1. 修改`src/App.vue`：
   ```vue
   <script setup>
   
   </script>
   
   <template>
     <div class="app">
       <router-view/>
   
       <van-tabbar class="placeholder" placeholder>
         <van-tabbar-item icon="home-o">首页</van-tabbar-item>
         <van-tabbar-item icon="search">搜索</van-tabbar-item>
         <van-tabbar-item icon="friends-o">联系</van-tabbar-item>
         <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
       </van-tabbar>
     </div>
   </template>
   
   <style scoped>
   @import "tailwindcss";
   
   .app {
     @apply flex flex-col h-screen;
   }
   </style>
   
   ```
2. 修改`src/views/HomeView.vue`：
   ```vue
   <script setup>
   
   </script>
   
   <template>
     <div class="view home-view">
       <van-nav-bar class="placeholder" fixed placeholder title="标题" />
   
       <div class="view__main home-view__main">
         <van-cell-group v-for="v in 100" :title="`分组${v}`">
           <van-cell title="单元格" value="内容" />
         </van-cell-group>
       </div>
     </div>
   </template>
   
   <style scoped>
   
   </style>
   
   ```
3. 更新`src/assets/main.css`：
   ```css
   @import "tailwindcss";
   
   @layer components {
     .view {
       @apply flex flex-col grow overflow-y-hidden;
     }
   
     .view__main {
       @apply grow overflow-y-auto;
     }
   
     .placeholder {
       @apply shrink-0;
     }
   }
   
   ```
   **布局逻辑**：
   
   ```
   我的逻辑是app为100vh 
   
   app 的子元素为 tab 和 view
   
   tab shrink0 保证占位符不被压缩 (flex item 默认 shrink 为 1)
   
   view 通过grow 占据剩下的高度, 
   
   这里 view 还需要设置overflow-hidden, 避免其因为没有设置height ,导致被子元素撑开
   
   这里确定了 view 的高度
   
   然后view 再设置 flex
   
   view 的子元素有 nav 和 main
   
   nav shrink 0 保证占位符不被压缩
   
   main 再分割剩下的高度 再通过设置 overflow-y-hidden 其实这里就可以确定出main的高度了, 
   
   mian 高度 = 100vh - nav 高度 - tabbar 高度
   ```
   
   效果如下：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/4.jpg" alt="image-20250422023925009" style="zoom:50%;" />
   
4. 确认Hash路由：
   ```js
   import { createRouter, createWebHashHistory } from 'vue-router'
   import HomeView from '../views/HomeView.vue'
   
   const router = createRouter({
     history: createWebHashHistory(import.meta.env.BASE_URL),
     routes: [
       { path: '/', name: 'home', component: HomeView }
     ]
   })
   export default router
   ```
   地址栏显示`/#/`表示成功：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/5.jpg" alt="image-20250422123157730" style="zoom: 50%;" />

#### 8. 手机测试
1. 运行`pnpm dev`，输入`u`获取网络地址（如`http://192.168.0.106:5173`）：
   ```bash
   u
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.0.106:5173/
   ```
2. 手机与电脑在同一Wi-Fi下，Chrome访问该地址。仅Chrome显示正常，Edge的navbar与状态栏重合，tabbar与底部导航键冲突。

#### 9. 配置PWA图标
1. 使用在线工具（https://favicon.inbrowser.app/tools/favicon-generator）生成图标：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/6.jpg" alt="image-20250422120922900" style="zoom:33%;" />
2. 下载资源包：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/7.jpg" alt="image-20250422120947334" style="zoom:33%;" />
3. 解压到`public`目录：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/8.jpg" alt="image-20250422121158221" style="zoom:50%;" />
4. 修改`index.html`：
   ```html
   <!DOCTYPE html>
   <html lang="">
     <head>
       <meta charset="UTF-8">
       <link rel="icon" href="/favicon.ico">
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
       <title>手机 PWA Demo</title>
       <link rel="apple-touch-icon" href="/apple-touch-icon.png">
       <link rel="icon" href="/favicon.ico" sizes="48x48">
       <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">
       <link rel="manifest" href="/site.webmanifest">
       <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">
       <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
     </head>
     <body>
       <div id="app"></div>
       <script type="module" src="/src/main.js"></script>
     </body>
   </html>
   ```
   成功效果：
   ![image-20250422123258121](./img/gork%20AI%E6%B6%A6%E8%89%B2/9.jpg)

#### 10. PWA调试
1. 构建项目：
   ```bash
   pnpm build
   ```
2. 安装`http-server`：
   ```bash
   npm install -g http-server
   ```
3. 在`dist`目录运行：
   ```bash
   http-server
   ```
4. PWA需通过HTTPS或`localhost`访问。电脑打开`chrome://inspect/#devices`进行端口映射：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/10.jpg" alt="image-20250422130015165" style="zoom:33%;" />
   绿灯表示成功：
   ![](./img/gork%20AI%E6%B6%A6%E8%89%B2/11.jpg)
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/12.jpg" alt="b7242b11a0744df57eee843b713d2c6" style="zoom:33%;" />
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/13.jpg" alt="fc4ee6705e2acbc090fbd8989c1eaa6" style="zoom:33%;" />
5. Chrome下载PWA需梯子（因依赖Google Play服务）。若无法添加桌面，可尝试Edge，但Edge显示不正常。

#### 11. 部署到GitHub Pages
1. 创建GitHub仓库（如`pwa-mobile-demo`）。
2. 添加远程仓库：
   ```bash
   git remote add origin https://github.com/your-username/pwa-mobile-demo.git
   ```
3. 安装`gh-pages`：
   ```bash
   pnpm add -D gh-pages
   ```
4. 在`package.json`添加脚本：
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
5. 更新`vite.config.js`：
   ```js
   export default defineConfig({
     base: '/pwa-mobile-demo/',
     // 其他配置...
   })
   ```
6. 重新生成manifest，填入仓库地址（https://your-username.github.io/pwa-mobile-demo/）：
   <img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/14.jpg" alt="image-20250422140742401" style="zoom:50%;" />
7. 构建并部署：
   ```bash
   pnpm build
   pnpm run deploy
   ```
8. 访问`https://your-username.github.io/pwa-mobile-demo/`：
   ![image-20250422141129338](./img/gork%20AI%E6%B6%A6%E8%89%B2/15.jpg)
   ![image-20250422141148656](./img/gork%20AI%E6%B6%A6%E8%89%B2/16.jpg)

**Gitee Pages说明**：Gitee Pages已停止服务，请勿使用，推荐GitHub Pages：
<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/17.jpg" alt="image-20250422145746669" style="zoom:50%;" />
![image-20250422145932467](./img/gork%20AI%E6%B6%A6%E8%89%B2/18.jpg)

#### 12. 打包为APK

要将你的PWA应用打包为Android的APK文件，以便直接安装到手机，你可以使用 PWABuilder（https://www.pwabuilder.com/），一个简单高效的在线工具。以下是详细步骤：

+ 点击 **Start** 按钮

<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/19.jpg" alt="image-20250422175611434" style="zoom: 50%;" />

+ 找到 **Package for Store** 按钮并点击

<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/20.jpg" alt="image-20250422175720111" style="zoom:50%;" />

<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/21.jpg" alt="image-20250422175750161" style="zoom:50%;" />

<img src="./img/gork%20AI%E6%B6%A6%E8%89%B2/22.jpg" alt="image-20250422175809054" style="zoom:50%;" />

**下载并解压**：

- 打包完成后，PWABuilder会提供一个压缩包下载链接。
- 下载压缩包，解压后即可获得.apk文件。
- 将APK文件传输到Android设备，点击安装即可（可能需启用“未知来源”安装权限）。



----

### 四、多端适配与注意事项

PWA基于H5，继承了H5的跨平台优势，但也面临多端适配问题：
- **调试挑战**：手机与电脑端口映射复杂，需借助`chrome://inspect`。
- **浏览器差异**：仅Chrome支持完整PWA功能，Edge和Firefox显示或功能异常。
- **推荐策略**：先开发小Demo，测试部署和体验后再投入大项目。

相比原生开发或Flutter，PWA的HTML/CSS/JS灵活性导致渲染引擎臃肿，各浏览器差异大。Flutter因高规范性和自带渲染引擎更稳定，但学习成本较高。

---

### 五、结语
本文详细介绍了如何使用Vue3、Vant、Tailwind CSS v4和PWA技术开发一款支持离线运行、可添加到桌面的手机App。下一篇文章将聚焦桌面端PWA开发，并深入讲解GitHub Actions和APK打包，敬请期待！

欢迎在评论区分享你的开发经验或问题，感谢阅读！

