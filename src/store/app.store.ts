import {defineStore} from "pinia";
import {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.ts";
import {useConfig} from "@/hooks/useConfig.ts";
import type {ConfigRef} from "@/hooks/useConfig.ts";
import {useCssVar} from "@/hooks/useCssVar.ts";
import IndexView from "@/view/IndexView/IndexView.vue";
import {changeIndexRoute} from "@/router/index.js";
import {ROUTE_INDEX, ROUTE_INDEX_NAME} from "@/const/route.js";
import MedicineView from "@/view/MedicineView/MedicineView.vue";

interface AppMode {
    LOG: Record<string, unknown>,
    LOVE: Record<string, unknown>,
    DRUG: Record<string, unknown>,
    TREATMENT: Record<string, unknown>,
}

export const useAppStore = defineStore('appStore', () => {

    const APP_MODE: AppMode = Object.freeze({
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

    const APP_ROUTE_COMPONENT: AppMode = {
        LOG: {
            component: IndexView,
        },
        LOVE: {
            component: IndexView,
        },
        DRUG: {
            component: MedicineView,
        },
        TREATMENT: {
            component: IndexView,
        }
    }

    const customAppMode = useConfig('customAppMode', {...APP_MODE});

    // 不要直接修改, 使用 changeAppMode 来修改
    const currentModeKey: ConfigRef<keyof AppMode> = useConfig('currentMode', 'LOG');

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
    function changeAppMode(key: keyof AppMode) {
        let mode = customAppMode.value[key];
        currentModeKey.value = key;
        primaryColor.value = mode.customPrimaryColor || mode.defaultPrimaryColor as any;

        changeIndexRoute({
            path: ROUTE_INDEX,
            name: ROUTE_INDEX_NAME,
            component: APP_ROUTE_COMPONENT[key].component as any,
        })
    }

    watch(currentModeKey, () => {
        changeAppMode(currentModeKey.value);
    }, {immediate: true})

    return {
        APP_MODE,
        changeAppMode,
        primaryColor,
        currentMode
    }
});