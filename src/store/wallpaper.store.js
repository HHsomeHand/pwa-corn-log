import {defineStore} from "pinia";
import {useCssVarFormat} from "@/hooks/useCssVarFormat.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";
import {useStyleElement} from "@/hooks/useStyleElement.js";


export const useWallpaperStore = defineStore('wallpaperStore', () => {
    const wallpaperPosX= useCssVarFormat('--wallpaper-pos-x', 'center', 'px');
    const wallpaperPosY= useCssVarFormat('--wallpaper-pos-y', 'center', 'px');

    const WALLPAPER_SIZE_MAPPER = Object.freeze({
        contain: '包含',
        cover: '覆盖',
    });

    const wallpaperSize= useCssVarFormat('--wallpaper-size', 'cover', '%');

    const wallpaperBgColor = useCssVar('--wallpaper-bg-color', 'transparent');

    const currentWallpaperBase64 = useConfig('currentWallpaperBase64', 'none');

    const vantBackground2Color = useCssVar('--van-background-2', 'var(--van-white)');

    // rgba(255, 255, 255, 0.3)
    const isBlurStyle = useStyleElement('bg-image-style', false, `
      .van-tabbar,
      .van-cell,
      .van-calendar {
        backdrop-filter: blur(var(--corn-backdrop-px));
      }
    `);

    const isBlur = useConfig('isBlur', false);

    // 设置了图片后才启用毛玻璃特效
    watch([isBlur, currentWallpaperBase64], () => {
        if (currentWallpaperBase64.value === 'none' || !Boolean(isBlur.value)) {
            isBlurStyle.value = false;
        } else {
            if (Boolean(isBlur.value)) {
                isBlurStyle.value = true;
            }
        }
    }, {immediate: true})

    const cornBackdropPx = useCssVarFormat('--corn-backdrop-px', 10, 'px');

    const cornCommentColor = useCssVar('--corn-comment-color', '#FFFFFFFF');

    const entries = {
        currentWallpaperBase64,
        vantBackground2Color, // 全局背景色
        wallpaperBgColor, // 壁纸背景色
        wallpaperSize, // 大小的百分比
        cornBackdropPx, // 模糊半径
        isBlur, // 是否启用毛玻璃特效
        cornCommentColor, // 备注的背景色
    };

    function setDefault() {
        for (let entry of Object.values(entries)) {
            entry?.setDefault?.();
        }
    }
    return {
        ...entries,
        WALLPAPER_SIZE_MAPPER,
        setDefault
    };
})