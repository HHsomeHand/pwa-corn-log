import type {InjectionKey} from 'vue'
import {useLogStore} from "@/store/logs.store.js";

export const LogStoreKey: InjectionKey<ReturnType<useLogStore>> = Symbol('logStoreKey')