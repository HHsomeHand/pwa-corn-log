import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app.store.ts";
import {i18n} from "@/i18n";
import {ReloadPage} from "@/utils/brower.ts";

export function changeLanguage(language: string) {
    i18n.global.locale.value = language as any;

    const appStore = useAppStore();

    appStore.changeLanguage();

    setLanguage(language);

    setTimeout(() => { // setTimeout 保证用户配置存储成功
        ReloadPage();
    }, 300);
}

const languageKey = "corn-language";

export function setLanguage(language: string) {
    localStorage.setItem(languageKey, language);
}

export function getLanguage() {
    return localStorage.getItem(languageKey);
}
