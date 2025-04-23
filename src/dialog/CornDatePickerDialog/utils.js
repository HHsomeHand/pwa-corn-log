// useDatePicker.js
import CornDatePickerDialog from "@/dialog/CornDatePickerDialog/CornDatePickerDialog.vue";
import {useGlobalCpnCallback} from "@/hooks/globalCpn.hook.ts";

// 用户选择了就 resolve date
// 用户没有选择, 就 resolve null
export const showDatePickerDialog = useGlobalCpnCallback(CornDatePickerDialog);