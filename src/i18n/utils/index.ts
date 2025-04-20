import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app.store.ts";
import {i18n} from "@/i18n";
import {ReloadPage} from "@/utils/brower.ts";
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';
import {Locale} from "vant";


export function changeLanguage(language: string) {
    i18n.global.locale.value = language as any;

    const appStore = useAppStore();

    appStore.changeLanguage();

    setLanguage(language); // 存储 Language

    loadVantLang(language); // 加载 Vant 的语言包

    // setTimeout(() => { // setTimeout 保证用户配置存储成功
    //     ReloadPage();
    // }, 300);
}

const languageKey = "corn-language";

export function setLanguage(language: string) {
    localStorage.setItem(languageKey, language);
}

export function getLanguage() {
    return localStorage.getItem(languageKey);
}

export function loadVantLang(language: string) {
    if (language === 'zh') {
        Locale.use('zh', zhCN);
    } else if (language === 'en') {
        Locale.use('en', enUS);
    }
}
