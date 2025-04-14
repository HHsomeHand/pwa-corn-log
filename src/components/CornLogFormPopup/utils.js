import CornLogFormPopup from "@/components/CornLogFormPopup/CornLogFormPopup.vue";
import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";
import {ENTRY_TYPE} from "@/components/CornLogFormPopup/ENTRY_TYPE.js";


// showLogFormPopup(callback, {entries, id, submitText})
// 用户提交了 resolve {log, comment} (entries 的 key 名)
// 用户关闭了, 就 resolve null
export const showLogFormPopup = useGlobalCpnCallback(CornLogFormPopup, {
    showMethod: "showPopup"
});

export async function showInputPopup({
     label, placeholder, defaultVal, submitText,
     isPending = true
}) {
    const result = await showLogFormPopup(null, {
        entries: {
            value: generateEntry({
                label,
                placeholder,
                defaultVal,
                isReturnSubmit: true,
            }),
        },
        submitText,
    });

    if (result === null && isPending) {
        return new Promise(() => {});
    } else {
        return result.value;
    }
}

// 这里这样写, 主要是为了IDE的参数提示
export function generateEntry({
    label = "标签名",
    placeholder = "提示",
    type = ENTRY_TYPE.STR, // STR -> 输入框, Date -> 选择按钮
    defaultVal = "", // 用于清空 popup 表单, 或设置初始值
    isReturnSubmit = false, // 是否在该条目, 回车时触发提交
} = {}) {
    return {
        label,
        placeholder,
        type,
        defaultVal,
        isReturnSubmit
    }
}

export function getDefaultValue(variable) {
    if (variable instanceof Date) return new Date();

    const type = typeof variable;

    const defaults = {
        string: "",
        number: 0,
        boolean: false,
        object: null, // 这里 null 是 JS 中 object 类型的默认值
        function: () => {},
        undefined: undefined,
        bigint: 0n,
        symbol: Symbol()
    };

    return defaults[type] ?? undefined;
}