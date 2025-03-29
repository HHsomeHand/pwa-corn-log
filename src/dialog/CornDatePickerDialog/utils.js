// useDatePicker.js
import { createApp } from 'vue'
import CornDatePickerDialog from "@/dialog/CornDatePickerDialog/CornDatePickerDialog.vue";

let instance = null

// 用户选择了就 resolve date
// 用户没有选择, 就 resolve null
export function showDatePickerDialog(confirmCallback) {
    return new Promise((resolve) => {
        // 如果实例不存在，创建并挂载
        if (!instance) {
            const div = document.createElement('div')
            document.body.appendChild(div)

            const app = createApp(CornDatePickerDialog)
            instance = app.mount(div)
        }

        // 显示对话框
        instance.showDialog((date) => {
            confirmCallback?.(date)
            resolve(date)
        })
    })
}