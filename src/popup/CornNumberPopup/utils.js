import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.js";
import CornNumberPopup from "@/popup/CornNumberPopup/CornNumberPopup.vue";


export const showNumberPopup = useGlobalCpnCallback(CornNumberPopup, {
    showMethod: "showPopup"
});
