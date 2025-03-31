import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '@/view/IndexView/IndexView.vue'
import CalendarView from "@/view/CalendarView/CalendarView.vue";
import {ROUTE_CALENDAR, ROUTE_INDEX} from "@/const/route.js";

const routes = [
    {
        path: ROUTE_INDEX,
        component: IndexView
    },
    {
        path: ROUTE_CALENDAR,
        component: CalendarView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router