// i18n / index.ts
import { createI18n } from 'vue-i18n';

// zh: 导入中文翻译
// en: import chinese translation
import zhMessage from './locales/zh' // ./locales/zh/index.ts
import enMessage from './locales/en'
import {getLanguage} from "@/i18n/utils";

// zh: 合并模块到语言对象
// en: merge module to language object
const messages = {
    zh: zhMessage, // chinese
    en: enMessage, // english
};

// 获取用户浏览器语言
const getBrowserLocale = () => {
    const browserLocale = navigator.language || navigator.languages[0];
    //  'zh-CN' 转为 'zh'
    return browserLocale.split('-')[0];
};

// 创建 i18n 实例
export const i18n = createI18n({
    legacy: false,
    warnHtmlMessage: true,
    locale: getLanguage() ?? getBrowserLocale(), // 默认语言
    fallbackLocale: 'en', // 回退语言
    messages
});

// i18n.global.locale.value = 'zh'; // 没用
