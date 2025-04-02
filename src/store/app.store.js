import {defineStore} from "pinia";
import {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.js";
import {useConfig} from "@/hooks/useConfig.js";
import {useCssVar} from "@/hooks/useCssVar.js";


export const useAppStore = defineStore('appStore', () => {

    const APP_MODE = Object.freeze({
        LOG: {
            title: "日志",
            defaultPrimaryColor: CUSTOM_ORANGE_HEX,
        },
        LOVE: {
            title: "善举",
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.RED),
        },
        DRUG: {
            title: "药律",
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.BLUE),
        },
        TREATMENT: {
            title: "戒律",
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.GREEN),
        }
    });

    const customAppMode = useConfig('customAppMode', {...APP_MODE});

    // 不要直接修改, 使用 changeAppMode 来修改
    const currentModeKey = useConfig('currentMode', 'LOG');

    const currentMode = computed(() => {
        return {
            ...APP_MODE[currentModeKey.value],
        }
    })

    const PRIMARY_COLOR_VAR_NAME = '--van-primary-color';

    const primaryColor = useCssVar(PRIMARY_COLOR_VAR_NAME, CUSTOM_ORANGE_HEX);

    watch(primaryColor, () => {
        customAppMode.value[currentModeKey.value].customPrimaryColor = primaryColor.value;
    });

    // changeAppMode(APP_MODE.LOG)
    function changeAppMode(key) {
        let mode = customAppMode.value[key];
        currentModeKey.value = key;
        primaryColor.value = mode.customPrimaryColor || mode.defaultPrimaryColor;
    }

    return {
        APP_MODE,
        changeAppMode,
        primaryColor,
        currentMode
    }
});