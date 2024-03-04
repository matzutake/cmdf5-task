import { createRouter, createWebHistory } from "vue-router";
import TaskList from '../views/TaskList.vue'
import TaskBoard from '../views/TaskBoard.vue'

const router = createRouter({
    routes: [
        {
            path: '/',
            redirect: '/task-list'
        },
        {
            path: '/task-list',
            component: TaskList
        },
        {
            path: "/task-board",
            component: TaskBoard
        }
    ],
    history: createWebHistory()
})

export default router