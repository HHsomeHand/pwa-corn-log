import {useGlobalScopedI18n} from "@/hooks/useGlobalScopedI18n.js";

const {t} = useGlobalScopedI18n('wallpaper');

export const WALLPAPER_SIZE_MAPPER = Object.freeze({
    // 包含
    contain: t('contain'),
    // 覆盖
    cover: t('cover'),
});

export const WALLPAPER_X_POS = Object.freeze({
    // 左
    left: t('left'),
    // 中
    center: t('center'),
    // 右
    right: t('right'),
});

export const WALLPAPER_Y_POS = Object.freeze({
    // 上
    top: t('top'),
    // 中
    center: t('center'),
    // 下
    bottom: t('bottom'),
});
