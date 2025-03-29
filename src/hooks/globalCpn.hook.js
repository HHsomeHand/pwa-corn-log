// useDialog.js
import { createApp } from 'vue'

/**
 * 创建全局组件 Hook
 * @param {Component} component Vue 组件
 * @param {Object} options 配置项
 *  - showMethod: 默认值为 showDialog
 * @param {string} [options.showMethod='showDialog'] 组件实例的显示方法名
 * @returns {function(): Promise}
 */
export function useGlobalCpn(component, { showMethod = 'showDialog' } = {}) {
    let instance = null

    return (callback) => {
        return new Promise((resolve) => {
            // 单例检查
            if (!instance) {
                const div = document.createElement('div')
                document.body.appendChild(div)
                instance = createApp(component).mount(div)
            }

            // 调用组件实例的显示方法
            instance[showMethod]((...args) => {
                // 处理回调逻辑
                if (args[0]) {
                    callback?.(...args)
                }
                resolve(args[0] ?? null) // 默认解析第一个参数
            })
        })
    }
}
