import {useI18n} from "vue-i18n";
import {i18n} from "@/i18n";

export function useGlobalScopedI18n(scopePrefix: string) {
    const $t = i18n.global.t;
    // @ts-ignore
    const t = (key: string, ...args: any[]) => $t(`${scopePrefix}.${key}`, ...args)
    return { t }
}
