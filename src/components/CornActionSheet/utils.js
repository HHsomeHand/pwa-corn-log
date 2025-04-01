import {useGlobalCpn, useGlobalCpnCallback} from "@/hooks/globalCpn.hook.js";
import CornActionSheet from "@/components/CornActionSheet/CornActionSheet.vue";


// 不可以这么用
export const showActionSheet = useGlobalCpn(CornActionSheet, {
    showMethod: "showActionSheet"
});