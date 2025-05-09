import {defineStore} from "pinia";
import {CUSTOM_ORANGE_HEX, VANT_COLOR_VARS, vantVarName2ColorHex} from "@/color/vant.color.ts";
import type {ConfigRef} from "@/hooks/useConfig.ts";
import {useConfig} from "@/hooks/useConfig.ts";
import {useCssVar} from "@/hooks/useCssVar.ts";
import IndexView from "@/view/IndexView/IndexView.vue";
import {ROUTE_INDEX, ROUTE_INDEX_NAME} from "@/const/route.js";
import DrugView from "@/view/DrugView/DrugView.vue";
import type {AppModeEntry} from "@/model/app.type.ts";
import LoveView from "@/view/LoveView/LoveView.vue";
import TreatmentView from "@/view/TreatmentView/TreatmentView.vue";
import {useLogStoreFactory} from "@/store/logs.store";
import {useI18n} from "vue-i18n";
import {i18n} from "@/i18n";
import {pickFields} from "@/utils/object.ts";
import {ReloadPage} from "@/utils/brower.ts";
import {useGlobalScopedI18n} from "@/hooks/useGlobalScopedI18n.ts";

export interface AppMode {
    LOG: Record<string, unknown>,
    LOVE: Record<string, unknown>,
    DRUG: Record<string, unknown>,
    TREATMENT: Record<string, unknown>,
}

export const basicModeNames = ['LOG', 'LOVE', 'DRUG', 'TREATMENT'];

export const useAppStore = defineStore('appStore', () => {
    const appComponentMap = {
        LOG: IndexView,
        DRUG: DrugView,
        LOVE: LoveView,
        TREATMENT: TreatmentView,
    }

    type ModeMap = {[key: string]: AppModeEntry};

    const appModeEntryMap: ModeMap = {
        LOG: {
            storeName: 'logs',
            // '日志'
            title: i18n.global.t('appStore.logTitle'),
            defaultPrimaryColor: CUSTOM_ORANGE_HEX,
            componentKey: 'LOG',
        },
        DRUG: {
            storeName: 'drugs',
            // "药律"
            title: i18n.global.t('appStore.drugTitle'),
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.BLUE),
            componentKey: 'DRUG'
        },
        LOVE: {
            storeName: 'loves',
            // '善举'
            title: i18n.global.t('appStore.loveTitle'),
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.RED),
            componentKey: 'LOVE'
        },
        TREATMENT: {
            storeName: 'treatments',
            // '戒律'
            title: i18n.global.t('appStore.treatmentTitle'),
            defaultPrimaryColor: vantVarName2ColorHex(VANT_COLOR_VARS.GREEN),
            componentKey: 'TREATMENT'
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
    const APP_MODE: ModeMap = Object.freeze(
        JSON.parse(JSON.stringify(appModeEntryMap))
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
    // const APP_ROUTE_COMPONENT =  (
    //     Object.entries(appModeEntryMap).reduce((result, entry) => {
    //         result[entry[0]] = pickFields(entry[1], ["component"]);
    //         return result;
    //     }, {} as any)
    // )

    // customAppMode 和 APP_MODE 的差异: APP_MODE 是常量, 用于恢复默认值, 而 customAppMode是变量
    // customAppMode 会记录用户修改的颜色
    const customAppMode = useConfig('customAppMode', {...APP_MODE});

    const currentModeKey: ConfigRef<keyof AppMode> = useConfig('currentMode', 'LOG');



    function addMode(modeName: string, componentKey) {
        if (basicModeNames.includes(modeName)) {
            return false;
        }

        customAppMode.value[modeName] = {
            storeName: modeName,
            title: modeName,
            defaultPrimaryColor: CUSTOM_ORANGE_HEX,
            componentKey: componentKey,
        };

        return true;
    }

    function removeMode(modeKey: string) {
        if (basicModeNames.includes(modeKey)) {
            return false;
        }

        const logStore = useLogStoreFactory(modeKey)();

        logStore.clearLogs();

        delete customAppMode.value[modeKey];

        if (currentModeKey.value === modeKey) {
            changeAppMode('LOG');
        }

        return true;
    }

    const currentMode = computed<AppModeEntry>(() => {
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
            ReloadPage();
        }, 100);
    }

    const currentRoute = computed(() => {
        return {
            path: ROUTE_INDEX,
            name: ROUTE_INDEX_NAME,
            component: appComponentMap[currentMode.value.componentKey],
        }
    })

    // 刷新 title
    function changeLanguage() {
        const {t} = useGlobalScopedI18n('appStore');

        /*
            title: i18n.global.t('appStore.logTitle'),
         */
        Object.entries(appModeEntryMap).map(([key, value]) => {
            customAppMode.value[key].title = t(key.toLowerCase() + 'Title');
        });
    }

    return {
        APP_MODE,
        customAppMode,
        changeAppMode,
        primaryColor,
        currentMode,
        appModeEntryMap,
        currentTitle,
        currentModeKey: computed(() => currentModeKey), // 请通过 changeAppMode 来修改
        currentRoute,
        addMode,
        removeMode,
        changeLanguage
    }
});
