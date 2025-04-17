import { useI18n } from 'vue-i18n'

export function useScopedI18n(scopePrefix: string) {
    const { t: $t } = useI18n()
    // @ts-ignore
    const t = (key: string, ...args: any[]) => $t(`${scopePrefix}.${key}`, ...args)
    return { t }
}
