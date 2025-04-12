// globalCpn.hook.ts
import { createApp } from 'vue'

function createSingletonInstance<T extends ComponentPublicInstance>(component: Component) {
    let instance: T | null = null

    return () => {
        if (!instance) {
            const div = document.createElement('div')
            document.body.appendChild(div)
            instance = createApp(component).mount(div) as T;
        }
        return instance
    }
}

// 返回一个函数, 你调用这个函数, 就相当于调用组件实例名字为 showMethod 的函数
// 具体案例参考 CornNumberPopup.vue
export function useGlobalCpn<
    F extends (...args: any[]) => any // 返回的函数的类型
>(
    component: Component,
    { showMethod = 'showDialog'} = {}
) {
    const getInstance = createSingletonInstance(component)

    return (...args: Parameters<F>) => {
        return new Promise((resolve) => {
            const instance = getInstance()

            // 调用组件实例的显示方法
            const method = instance[showMethod as keyof typeof instance];

            if (typeof method === 'function') {
                let result = method.apply(instance, args);
                resolve(result);
            } else {
                console.error(`useGlobalCpn: Method "${showMethod}" not found on component instance.`);
            }
        }) as ReturnType<F>; // END return new Promise
    }
}


/**
 * 返回一个函数, 你调用这个函数, 就相当于调用组件实例名字为 showMethod 的函数
 *
 * 该函数已经弃用, 推荐使用 useGlobalCpn, 具体案例参考 CornNumberPopup.vue
 *
 * 该函数与 useGlobalCpn 唯一的区别就是加了回调函数的判断逻辑:
 *  - 如果组件的 showMethod 不返回 null, 就调用你的回调
 *
 * 最佳实践规范: 尽量不要传回调函数, 直接 await
 *
 * 创建全局组件 Hook
 * @param {Component} component Vue 组件
 * @param {Object} options 配置项
 *  - showMethod: 默认值为 showDialog
 * @param {string} [options.showMethod='showDialog'] 组件实例的显示方法名
 * @returns {function(): Promise}
 */
export function useGlobalCpnCallback<
    T extends ComponentPublicInstance,
    K extends keyof T
>(
    component: Component,
    { showMethod = 'showDialog'} = {}
) {
    const getInstance = createSingletonInstance<T>(component)

    // 调用这个函数, 这个函数会调用 showMethod 函数, 并获取结果, 如果不为 null, 调用你的 callback
    return (callback: Function | null, options: unknown = {}) => {
        return new Promise((resolve) => {
            // 单例检查
            const instance = getInstance();

            const method = instance[(showMethod as K)];

            if (typeof method === 'function') {
                let result = method.apply(instance, [(result: unknown) => {
                    // 如果组件的 showMethod 不返回 null, 就调用你的回调
                    if (result !== null) {
                        callback?.(result);
                    }

                    resolve(result)
                }, options]);
            } else {
                console.error(`useGlobalCpnCallback: Method "${showMethod}" not found on component instance.`);
            }
        })
    }
}
