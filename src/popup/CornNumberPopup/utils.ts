import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";
import CornNumberPopup from "@/popup/CornNumberPopup/CornNumberPopup.vue";
import type {NumberDialogOption} from "@/popup/CornNumberPopup/types.ts";
import type {CallbackOption, HookResolveTuple} from "@/model/types.ts";

export async function showNumberPopup(options: NumberDialogOption){
    const _showNumberPopup = useGlobalCpnCallback(CornNumberPopup, {
        showMethod: "showPopup"
    });

    const result = await _showNumberPopup(null, options);

    const resultTuple: HookResolveTuple = [
        result == null,
        result
    ];

    return resultTuple;
}
