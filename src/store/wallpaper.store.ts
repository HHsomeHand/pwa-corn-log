import {defineStore} from "pinia";
import {useCssVarFormat} from "@/hooks/useCssVarFormat.ts";
import {useCssVar} from "@/hooks/useCssVar.ts";
import {useConfig} from "@/hooks/useConfig.ts";
import {useStyleElement} from "@/hooks/useStyleElement.ts";


export const useWallpaperStore = defineStore('wallpaperStore', () => {
    const wallpaperPosX= useCssVarFormat('--wallpaper-pos-x', 'center', 'vw');
    const wallpaperPosY= useCssVarFormat('--wallpaper-pos-y', 'center', 'vh');

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


    //      --van-text-color: var(--van-gray-8);
    const vantTextColor = useCssVar('--van-text-color', 'var(--van-gray-8)');

    //     --van-text-color-2: var(--van-gray-6);
    const vantTextColor2 = useCssVar('--van-text-color-2', 'var(--van-gray-6)');

    //     --van-text-color-3: var(--van-gray-5);
    const vantTextColor3 = useCssVar('--van-text-color-3', 'var(--van-gray-5)');

    // --corn-text-stroke-width: 0px;
    const cornTextStrokeWidth = useCssVarFormat('--corn-text-stroke-width', 0, 'px');
    // --corn-text-stroke-color: white;
    const cornTextStrokeColor = useCssVar('--corn-text-stroke-color', '#fff');

    // --corn-stroke-multiple: 5;
    const cornStrokeMultiple = useCssVar('--corn-stroke-multiple', 5);

    const entries = {
        currentWallpaperBase64,
        vantBackground2Color, // 全局背景色
        wallpaperBgColor, // 壁纸背景色
        wallpaperSize, // 大小的百分比
        cornBackdropPx, // 模糊半径
        isBlur, // 是否启用毛玻璃特效
        cornCommentColor, // 备注的背景色
        wallpaperPosX,
        wallpaperPosY,
        vantTextColor,
        vantTextColor2,
        vantTextColor3,
        cornTextStrokeWidth,
        cornTextStrokeColor,
        cornStrokeMultiple,
    };

    function setDefault() {
        for (let entry of Object.values(entries)) {
            entry?.setDefault?.();
        }
    }

    return {
        ...entries,
        setDefault
    };
})