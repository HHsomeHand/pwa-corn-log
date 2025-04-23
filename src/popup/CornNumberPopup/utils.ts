import {useGlobalCpn} from "@/hooks/globalCpn.hook.ts";
import CornNumberPopup from "@/popup/CornNumberPopup/CornNumberPopup.vue";
import type {ShowPopupFunction} from "@/popup/CornNumberPopup/types.ts";

export const showNumberPopup = useGlobalCpn<ShowPopupFunction>(CornNumberPopup, {
    showMethod: "showPopup"
});