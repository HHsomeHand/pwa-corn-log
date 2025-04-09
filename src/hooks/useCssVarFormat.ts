import {useCssVar} from "./useCssVar.ts";
import type {ConfigRef} from "@/hooks/useConfig.ts";

// 当用数值赋给cssVarFormat的时候会自动添加单位, 但当新值是字符串的时候将不做处理
export type CssVarType = string | number;

// 类型拓展：ref 对象 + setDefault 方法
export type FormatConfigRef<T> = ConfigRef<T> & {
    getFormat: () => string; // 获取格式化符号, 如 %
    getFormatValue: () => string;
};

export function useCssVarFormat(
    varName: string,
    defaultValue: CssVarType,
    format: string
) {
    // 获取存储的值
    const cssVar = useCssVar(varName, defaultValue);

    let initValue: CssVarType;

    if (typeof cssVar.value === "string") {
        initValue = parseInt(cssVar.value); // 不可以用 Number 替代 parseInt

        if (Object.is(initValue, NaN)) {
            // cssVar 值为center或...
            initValue = cssVar.value;
        }
    } else if (typeof cssVar.value === "number") {
        initValue = cssVar.value;
    } else {
        // 不可能走到这里
        throw new Error("useCssVarFormat: 解析遇到错误");
    }


    const cssVarFormat = ref(initValue) as unknown as FormatConfigRef<CssVarType>;

    watch(cssVarFormat, () => {
        if (typeof cssVarFormat.value === "number") {
            cssVar.value = cssVarFormat.value + format;

        } else if (cssVarFormat.value === null) {
            cssVar.value = 0;
        } else if (typeof cssVarFormat.value === "string") {
            cssVar.value = cssVarFormat.value;
        }
    });

    cssVarFormat.setDefault = () => {
        cssVarFormat.value = defaultValue;
    };

    cssVarFormat.getFormat = () => {
        return format;
    }

    cssVarFormat.getFormatValue = () => {
        return cssVarFormat.value + format;
    }

    return cssVarFormat;
}