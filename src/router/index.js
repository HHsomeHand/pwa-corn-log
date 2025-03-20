import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '@/view/IndexView/IndexView.vue'

const routes = [
    {
        path: '/',
        component: IndexView
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router