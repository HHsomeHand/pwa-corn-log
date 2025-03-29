// useDatePicker.js
import { createApp } from 'vue'
import CornDatePickerDialog from "@/dialog/CornDatePickerDialog/CornDatePickerDialog.vue";
import {useGlobalCpn} from "@/hooks/globalCpn.hook.js";

// 用户选择了就 resolve date
// 用户没有选择, 就 resolve null
export const showDatePickerDialog = useGlobalCpn(CornDatePickerDialog);