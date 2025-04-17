import { createI18n } from 'vue-i18n';

// 导入中文翻译
import zhMessage from './locales/zh' // ./locales/zh/index.ts


// 合并模块到语言对象
const messages = {
    zh: zhMessage, // chinese
};

// 创建 i18n 实例
export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh', // 默认语言
    fallbackLocale: 'en', // 回退语言
    messages
});
