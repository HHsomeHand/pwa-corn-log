import {defineStore} from "pinia";
import {useCssVarFormat} from "@/hooks/useCssVarFormat.js";
import {useCssVar} from "@/hooks/useCssVar.js";
import {useConfig} from "@/hooks/useConfig.js";


export const useWallpaperStore = defineStore('wallpaperStore', () => {
    const wallpaperPosX= useCssVarFormat('--wallpaper-pos-x', 'center', 'px');
    const wallpaperPosY= useCssVarFormat('--wallpaper-pos-y', 'center', 'px');
    const wallpaperSize= useCssVarFormat('--wallpaper-size', 'cover', '%');
    const wallpaperBgColor = useCssVar('--wallpaper-bg-color', '#fff');

    const currentWallpaperBase64 = useConfig('currentWallpaperBase64', 'none');
    return {
        currentWallpaperBase64
    }
})