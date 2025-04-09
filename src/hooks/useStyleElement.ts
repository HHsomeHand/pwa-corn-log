import {useConfig} from "@/hooks/useConfig.ts";

export  function useStyleElement(key: string, defaultValue: boolean, cssContent: string) {
    const isApplied = useConfig(key, defaultValue);

    // 创建 <style> 元素
    const style = document.createElement('style');

    style.innerHTML = cssContent;

    watch(isApplied, () => {
        if (isApplied.value) {
            document.head.appendChild(style);
        } else {
            if (style.parentNode === document.head) {
                document.head.removeChild(style);
            }
        }
    }, {immediate: true});

    return isApplied;

}