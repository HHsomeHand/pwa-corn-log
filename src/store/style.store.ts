// stores/counter.js
import {defineStore} from 'pinia';
import {useCssVarFormat} from "@/hooks/useCssVarFormat.ts";

export const useStyleStore = defineStore(
    'styles',
    () => {
        const cornLogSpaceHeight = useCssVarFormat('--corn-log-space-height', 0, 'px');

        //    --corn-font-size-xs: 13px;
        const cornFontSizeXs = useCssVarFormat('--corn-font-size-xs', 13, 'px');

        //     --corn-font-size-sm: 15px;
        const cornFontSizeSm = useCssVarFormat('--corn-font-size-sm', 15, 'px');

        //     --corn-font-size-md: 17px;
        const cornFontSizeMd = useCssVarFormat('--corn-font-size-md', 17, 'px');

        //     --corn-font-size-lg: 19px;
        const cornFontSizeLg = useCssVarFormat('--corn-font-size-lg', 19, 'px');


        const entries = {
            cornLogSpaceHeight,
            cornFontSizeXs,
            cornFontSizeSm,
            cornFontSizeMd,
            cornFontSizeLg,
        }

        function setDefault() {
            for (let entry of Object.values(entries)) {
                entry?.setDefault?.();
            }
        }

        return {
            setDefault,
            ...entries,
        }
    }
);
