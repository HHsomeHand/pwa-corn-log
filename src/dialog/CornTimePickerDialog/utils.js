// useDatePicker.js

import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";
import CornTimePickerDialog from "@/dialog/CornTimePickerDialog/CornTimePickerDialog.vue";

// 用户选择了就 resolve date
// 用户没有选择, 就 resolve null
export const showTimePickerDialog = useGlobalCpnCallback(CornTimePickerDialog);