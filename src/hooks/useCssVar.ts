import {useConfig} from "@/hooks/useConfig.ts";

export function useCssVar<T>(varName: string, defaultValue: T) {
    let cssVar = useConfig(varName, defaultValue);

    watch(cssVar, () => {
        if (cssVar.value !== null) {
            document.documentElement.style.setProperty(varName, String(cssVar.value));
        } else {
            // 值为 null 的时候, 移除属性
            document.documentElement.style.removeProperty(varName);
        }
    }, {immediate: true});

    return cssVar;
}