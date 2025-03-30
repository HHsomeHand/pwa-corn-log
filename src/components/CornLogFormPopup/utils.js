import CornLogFormPopup from "@/components/CornLogFormPopup/CornLogFormPopup.vue";
import {useGlobalCpn} from "@/hooks/globalCpn.hook.js";
import {ENTRY_TYPE} from "@/components/CornLogFormPopup/const.js";



// 用户提交了 resolve {log, comment}
// 用户关闭了, 就 resolve null
export const showLogFormPopup = useGlobalCpn(CornLogFormPopup, {
    showMethod: "showPopup"
});

// 这里这样写, 主要是为了IDE的参数提示, 如果用了TS, 直接定义DTO类型就ok了
export function generateEntry({
    label = "标签名",
    placeholder = "提示",
    type = ENTRY_TYPE.STR,
    defaultVal = ""
} = {}) {
    return {
        label,
        placeholder,
        type,
        defaultVal
    }
}

export function getDefaultValue(variable) {
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