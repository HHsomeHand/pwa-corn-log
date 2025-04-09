import {useConfig} from "@/hooks/useConfig.ts";

export function useCssVar<T>(varName: string, defaultValue: T) {
    let cssVar = useConfig(varName, defaultValue);

    watch(cssVar, () => {
        document.documentElement.style.setProperty(varName, String(cssVar.value));
    }, {immediate: true});

    return cssVar;
}