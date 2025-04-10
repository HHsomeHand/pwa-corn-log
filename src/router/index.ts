import {
    createWebHistory,
    createRouter
} from 'vue-router'

import type { RouteRecordRaw } from 'vue-router';

import IndexView from '@/view/IndexView/IndexView.vue'
import CalendarView from "@/view/CalendarView/CalendarView.vue";
import {
    ROUTE_CALENDAR,
    ROUTE_CALENDAR_NAME,
    ROUTE_CONFIG, ROUTE_CONFIG_NAME,
    ROUTE_INDEX,
    ROUTE_INDEX_NAME,
    ROUTE_SEARCH, ROUTE_SEARCH_NAME
} from "@/const/route.ts";
import SearchView from "@/view/SearchView/SearchView.vue";
import ConfigView from "@/view/ConfigView/ConfigView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: ROUTE_INDEX,
        name: ROUTE_INDEX_NAME,
        component: IndexView
    },
    {
        path: ROUTE_CALENDAR,
        name: ROUTE_CALENDAR_NAME,
        component: CalendarView
    },
    {
        path: ROUTE_SEARCH,
        name: ROUTE_SEARCH_NAME,
        component: SearchView
    },
    {
        path: ROUTE_CONFIG,
        name: ROUTE_CONFIG_NAME,
        component: ConfigView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export function changeIndexRoute(indexRoute: RouteRecordRaw) {
    // 先移除已有的首页路由（如果存在）
    if (router.hasRoute(ROUTE_INDEX_NAME)) {
        router.removeRoute(ROUTE_INDEX_NAME);
    }

    // 根据模式添加首页路由
    const newIndexRoute = {
        ...indexRoute,
        name: ROUTE_INDEX_NAME,
    };

    // 添加所有路由
    router.addRoute(newIndexRoute);
}

export default router