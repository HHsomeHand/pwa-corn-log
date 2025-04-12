import type { InjectionKey } from 'vue'
import {useLogStore} from "@/store/logs.store";

export const LogStoreKey: InjectionKey<ReturnType<useLogStore>> = Symbol('logStoreKey')