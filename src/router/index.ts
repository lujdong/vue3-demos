import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import demoRoutes from './modules/demos/'

const basicRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/demos',
        redirect: '/demos/todo-list',
        component: () => import('@/views/demos/DemoIndex.vue'),
        children: demoRoutes
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: [...basicRoutes]
})

export default router
