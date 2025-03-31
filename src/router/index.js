import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '@/view/IndexView/IndexView.vue'
import CalendarView from "@/view/CalendarView/CalendarView.vue";
import {ROUTE_CALENDAR, ROUTE_INDEX, ROUTE_SEARCH} from "@/const/route.js";
import SearchView from "@/view/SearchView/SearchView.vue";

const routes = [
    {
        path: ROUTE_INDEX,
        component: IndexView
    },
    {
        path: ROUTE_CALENDAR,
        component: CalendarView
    },
    {
        path: ROUTE_SEARCH,
        component: SearchView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router