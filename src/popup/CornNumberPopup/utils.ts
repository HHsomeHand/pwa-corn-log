import {useGlobalCpn, useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";
import CornNumberPopup from "@/popup/CornNumberPopup/CornNumberPopup.vue";
import type {NumberDialogOption} from "@/popup/CornNumberPopup/types.ts";
import type {CallbackOption, HookResolveTuple} from "@/model/types.ts";

export const showNumberPopup = useGlobalCpn(CornNumberPopup, {
    showMethod: "showPopup"
});