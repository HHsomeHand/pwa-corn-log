// stores/counter.js
import { defineStore } from 'pinia';

export const useLockStore = defineStore(
    'lock',
    () => {
        const isLock = ref(true);
        const password = ref("");

        return {
            isLock,
            password
        }
    },
    {
        // 配置持久化
        persist: true, // 默认使用 localStorage 持久化所有状态
    } as any
);