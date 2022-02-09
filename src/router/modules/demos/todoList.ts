import { RouteRecordRaw } from 'vue-router'

const todoList: RouteRecordRaw[] = [
    {
        path: 'todo-list',
        name: 'TodoList',
        component: () => import('@/views/todo-list/src/TodoList.vue')
    }
]

export default todoList
