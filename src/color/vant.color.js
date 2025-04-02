// 获取根元素的计算样式
const rootStyles = getComputedStyle(document.documentElement);

export const VANT_COLOR_VARS = Object.freeze({
    BLACK: '--van-black',
    RED: '--van-red',
    BLUE: '--van-blue',
    GREEN: '--van-green',
    ORANGE: '--van-orange',
    ORANGE_DARK: '--van-orange-dark',
    ORANGE_LIGHT: '--van-orange-light',
})

export const CUSTOM_ORANGE_HEX = "#FF8917";

// 定义要获取的 Vant 颜色变量列表
const vantColors = [
    ...Object.values(VANT_COLOR_VARS),
];


// 遍历并获取每个颜色的 HEX 值
const colorValues = {};
vantColors.forEach(colorVar => {
    const hexValue = rootStyles.getPropertyValue(colorVar).trim();
    colorValues[colorVar] = hexValue;
});

export function vantVarName2ColorHex(varName) {
    if (!Object.values(VANT_COLOR_VARS).includes(varName)) {
        console.error("vantVar2Hex: 请传递正确的vant变量名")
    }

    return colorValues[varName];
}

export default colorValues;