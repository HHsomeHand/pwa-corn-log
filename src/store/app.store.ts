import {defineStore} from "pinia";
import {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.ts";
import type {ConfigRef} from "@/hooks/useConfig.ts";
import {useConfig} from "@/hooks/useConfig.ts";
import {useCssVar} from "@/hooks/useCssVar.ts";
import IndexView from "@/view/IndexView/IndexView.vue";
import {ROUTE_INDEX, ROUTE_INDEX_NAME} from "@/const/route.js";
import DrugView from "@/view/DrugView/DrugView.vue";
import type {AppModeEntry} from "@/model/app.type.ts";
import {pickFields} from "@/utils/object.ts";
import {useRouter} from "vue-router";

export interface AppMode {
    LOG: Record<string, unknown>,
    LOVE: Record<string, unknown>,
    DRUG: Record<string, unknown>,
    TREATMENT: Record<string, unknown>,
}

export const useAppStore = defineStore('appStore', () => {

    const appModeEntryMap: {[key: string]: AppModeEntry} = {
        LOG: {
            storeName: 'logs',
            title: '日志',
            defaultPrimaryColor: CUSTOM_ORANGE_HEX,
            component: IndexView,
        },
        DRUG: {
            storeName: 'drugs',
            title: '药律',
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.BLUE),
            component: DrugView,
        },
        LOVE: {
            storeName: 'loves',
            title: '善举',
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.RED),
            component: IndexView,
        },
        TREATMENT: {
            storeName: 'treatments',
            title: '戒律',
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.GREEN),
            component: IndexView,
        },
    };

    // 这里这样编写, 是为了兼容老代码, 以前没用使用 TS, 导致结构分散
    /**
     *     const APP_MODE: AppMode = Object.freeze({
     *         LOG: {
     *             title: "日志",
     *             defaultPrimaryColor: CUSTOM_ORANGE_HEX,
     *         },
     *         LOVE: {
     *             title: "善举",
     *             defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.RED),
     *         },
     *         DRUG: {
     *             title: "药律",
     *             defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.BLUE),
     *         },
     *         TREATMENT: {
     *             title: "戒律",
     *             defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.GREEN),
     *         }
     *     });
     */
    const APP_MODE = Object.freeze(
        Object.entries(appModeEntryMap).reduce((result, entry) => {
            result[entry[0]] = pickFields(entry[1], ["title", "defaultPrimaryColor", "storeName"]);
            return result;
        }, {} as any)
    );

    /**
     *     const APP_ROUTE_COMPONENT: AppMode = {
     *         LOG: {
     *             component: IndexView,
     *         },
     *         LOVE: {
     *             component: IndexView,
     *         },
     *         DRUG: {
     *             component: MedicineView,
     *         },
     *         TREATMENT: {
     *             component: IndexView,
     *         }
     *     }
     */
    const APP_ROUTE_COMPONENT =  (
        Object.entries(appModeEntryMap).reduce((result, entry) => {
            result[entry[0]] = pickFields(entry[1], ["component"]);
            return result;
        }, {} as any)
    )

    // customAppMode 和 APP_MODE 的差异: APP_MODE 是常量, 用于恢复默认值, 而 customAppMode是变量
    // customAppMode 会记录用户修改的颜色
    const customAppMode = useConfig<AppMode>('customAppMode', {...APP_MODE});

    const currentModeKey: ConfigRef<keyof AppMode> = useConfig('currentMode', 'LOG');

    const currentMode = computed(() => {
        return customAppMode.value[currentModeKey.value];
    })

    const currentTitle = computed(() => {
        return currentMode.value.title;
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

        setTimeout(() => { // setTimeout 保证用户配置存储成功
            window.location.reload(); // 刷新整个页面
        }, 100);
    }

    const currentRoute = computed(() => {
        return {
            path: ROUTE_INDEX,
            name: ROUTE_INDEX_NAME,
            component: APP_ROUTE_COMPONENT[currentModeKey.value].component,
        }
    })

    return {
        APP_MODE,
        changeAppMode,
        primaryColor,
        currentMode,
        appModeEntryMap,
        currentTitle,
        currentModeKey: computed(() => currentModeKey), // 请通过 changeAppMode 来修改
        currentRoute,
    }
});