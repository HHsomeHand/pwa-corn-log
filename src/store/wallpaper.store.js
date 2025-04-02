import {defineStore} from "pinia";
import {useCssVarFormat} from "@/hooks/useCssVarFormat.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";
import {useStyleElement} from "@/hooks/useStyleElement.js";


export const useWallpaperStore = defineStore('wallpaperStore', () => {
    const wallpaperPosX= useCssVarFormat('--wallpaper-pos-x', 'center', 'px');
    const wallpaperPosY= useCssVarFormat('--wallpaper-pos-y', 'center', 'px');
    const wallpaperSize= useCssVarFormat('--wallpaper-size', 'cover', '%');
    const wallpaperBgColor = useCssVar('--wallpaper-bg-color', 'transparent');

    const currentWallpaperBase64 = useConfig('currentWallpaperBase64', 'none');

    const vantBackground2Color = useCssVar('--van-background-2', 'var(--van-white)');

    // rgba(255, 255, 255, 0.3)
    const bBlurStyle = useStyleElement('bg-image-style', false, `
      .van-tabbar,
      .van-cell,
      .van-calendar {
        backdrop-filter: blur(var(--corn-backdrop-px));
      }
    `);

    // 设置了图片后才启用毛玻璃特效
    watch(currentWallpaperBase64, () => {
        if (currentWallpaperBase64.value === 'none') {
            bBlurStyle.value = false;
        } else {
            bBlurStyle.value = true;
        }
    }, {immediate: true})

    const cornBackdropPx = useCssVar('--corn-backdrop-px', 10, 'px');

    return {
        currentWallpaperBase64,
        vantBackground2Color, // 全局背景色
        wallpaperBgColor, // 壁纸背景色
        wallpaperSize, // 大小的百分比
        cornBackdropPx, // 模糊半径
    }
})