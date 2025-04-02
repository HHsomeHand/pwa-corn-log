import {useConfig} from "@/hooks/useConfig.js";

export function useCssVar(varName, defaultValue) {
    let cssVar = useConfig(varName, defaultValue);

    watch(cssVar, () => {
        document.documentElement.style.setProperty(varName, cssVar.value);
    }, {immediate: true});

    return cssVar;
}