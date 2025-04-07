import {useGlobalCpn, useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";
import CornNumberPopup from "@/popup/CornNumberPopup/CornNumberPopup.vue";
import type {NumberDialogOption, ShowPopupFunction} from "@/popup/CornNumberPopup/types.ts";
import type {CallbackOption} from "@/model/types.ts";

export const showNumberPopup = useGlobalCpn<ShowPopupFunction>(CornNumberPopup, {
    showMethod: "showPopup"
});