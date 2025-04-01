import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.js";
import CornCheckboxPopup from "@/popup/CornCheckboxPopup/CornCheckboxPopup.vue";

export const showCheckboxPopup = useGlobalCpnCallback(CornCheckboxPopup, {
    showMethod: "showPopup"
});
