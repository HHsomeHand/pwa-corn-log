import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useCpnStore = defineStore('cpnStore', () => {
    // 使用 Map 来存储组件引用，key 为组件唯一标识，value 为组件的 ref
    const components = ref(new Map<string, unknown>());

    // 注册组件
    function registerComponent(id: string, componentRef) {
        components.value.set(id, componentRef);
    }

    // 注销组件（可选，避免内存泄漏）
    function unregisterComponent(id: string) {
        components.value.delete(id);
    }

    // 获取组件引用
    function getComponent(id: string) {
        return components.value.get(id);
    }

    return {
        components,
        registerComponent,
        unregisterComponent,
        getComponent,
    };
});