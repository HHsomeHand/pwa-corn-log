import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '@/view/IndexView/IndexView.vue'
import CalendarView from "@/view/CalendarView/CalendarView.vue";

const routes = [
    {
        path: '/',
        component: IndexView
    },
    {
        path: '/cal',
        component: CalendarView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router