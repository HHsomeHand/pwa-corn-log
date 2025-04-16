// stores/counter.js
import {defineStore} from 'pinia';
import {useCssVarFormat} from "@/hooks/useCssVarFormat.ts";
import {useConfig} from "@/hooks/useConfig.ts";

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

        const isAlwaysShowComment = useConfig('is-always-show-comment', false);

        const cornLogEmptyCommentMinHeight = useCssVarFormat('--corn-log-empty-comment-min-height', 1.5, 'em');

        const cornLogMarginBottom = useCssVarFormat('--corn-log-margin-bottom', 0, 'px');

        const cornListDateGap = useCssVarFormat('--corn-list-date-gap', 0, 'px');

        const cornLogTimeFontSize = useCssVarFormat('--corn-log-time-font-size', 12, 'px');

        // --corn-log-time-date-min-width
        const cornLogTimeDateMinWidth = useCssVarFormat('--corn-log-time-date-min-width', 50, 'px');

        const entries = {
            cornLogSpaceHeight,
            cornFontSizeXs,
            cornFontSizeSm,
            cornFontSizeMd,
            cornFontSizeLg,
            isAlwaysShowComment,
            cornLogEmptyCommentMinHeight,
            cornLogMarginBottom,
            cornListDateGap,
            cornLogTimeFontSize,
            cornLogTimeDateMinWidth
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
