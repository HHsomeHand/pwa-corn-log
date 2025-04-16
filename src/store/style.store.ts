// stores/counter.js
import {defineStore} from 'pinia';
import {useCssVarFormat} from "@/hooks/useCssVarFormat.ts";

export const useStyleStore = defineStore(
    'styles',
    () => {
        const cornLogSpaceHeight = useCssVarFormat('--corn-log-space-height', 0, 'px');


        return {
            cornLogSpaceHeight
        }
    }
);
