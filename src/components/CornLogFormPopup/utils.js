import { createApp } from 'vue'
import CornLogFormPopup from "@/components/CornLogFormPopup/CornLogFormPopup.vue";

let instance = null

// 用户提交了 resolve {log, comment}
// 用户关闭了, 就 resolve null
export function showLogFormPopup(submitCallback) {
    return new Promise((resolve) => {
        // 如果实例不存在，创建并挂载
        if (!instance) {
            const div = document.createElement('div')
            document.body.appendChild(div)

            const app = createApp(CornLogFormPopup)
            instance = app.mount(div)
        }

        // 显示 Popup
        instance.showPopup((submitInfo) => {
            if (submitInfo) {
                submitCallback?.(submitInfo)
            }

            resolve(submitInfo)
        })
    })
}