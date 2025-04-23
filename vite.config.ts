// vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  // build: {
  //   minify: false,
  // },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // 禁用开发模式下的 workbox, 这会和 hmr 冲突, 而且没用
      },
      workbox: {
        globPatterns: ['**/*.{mjs,js,css,html,png,jpg,gif,svg,woff,woff2}'], // 需要缓存的静态资源文件类型, 默认为 **/*.{js,css,html}
      },
      // includeAssets: ['非 public 文件夹下的文件'], // 额外需要缓存的文件
      manifest: false
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [VantResolver()],
    }),
    Components({
      dirs: ['src'], // ✅ 扫描整个 src 文件夹（默认只扫描 src/components）
      extensions: ['vue'], // 可选，默认就是 ['vue']
      deep: true, // ✅ 递归子目录
      resolvers: [VantResolver()],
    }),
    tailwindcss(),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    // 不要往稳定的项目中引入外部框架, 会把好好的项目干报废, 差之秋毫, 缪以千里哇!
    // 这里的问题是项目的 i18n 无法正常加载, 所以移除 quasar
    // quasar({
    //   sassVariables: fileURLToPath(
    //       new URL('./src/quasar-variables.sass', import.meta.url)
    //   )
    // }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0', // 允许外部设备访问
    open: true, // 自动打开浏览器
  },
  base: "/pwa-corn-log/",
})
