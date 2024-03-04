import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        tasks: [],
        today_tasks_count: 0,
        tomorrow_tasks_count: 0, 
        now: new Date().toLocaleString().slice(0, 17).split(',')
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        updateNow(state) {
            state.now = new Date().toLocaleString().slice(0, 17).split(',')
        },
        addTask(state, newTask) {
            state.tasks.push(newTask)
        },
        removeTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId)
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) 
                state.tasks.splice(index, 1, updatedTask);
        },
        setTodayTasksCount(state, count) {
            state.today_tasks_count = count
        },
        setTomorrowTasksCount(state, count) {
            state.tomorrow_tasks_count = count
        }
    },
    actions: {
        async fetchTasks({ commit, dispatch }) {
            const response = await axios.get('http://localhost:3000/tasks')
            commit('setTasks', response.data)
            dispatch('updateTasksCount')
        },
        async updateTaskOnServer({ commit, dispatch }, updatedTask) {
            const response = await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask)
            commit('updateTask', response.data)
            dispatch('updateTasksCount')
        },
        async addTaskOnServer({ commit, dispatch }, newTask) {
            const response = await axios.post('http://localhost:3000/tasks', newTask)
            commit('addTask', response.data)
            dispatch('updateTasksCount')
        },
        async removeTaskOnServer({ commit, dispatch }, task) {
            const response = await axios.delete(`http://localhost:3000/tasks/${task.id}`)
            commit('removeTask', task.id)
            dispatch('updateTasksCount')
        },
        updateTasksCount({ commit, state }) {
            const today = new Date(new Date().getTime() + 3000 * 60 * 60).toISOString().slice(0, 10)
            const tomorrow = new Date(new Date().getTime() + 3000 * 60 * 60 + 86400000)
            const tomorrowFormatted = tomorrow.toISOString().slice(0, 10)
        
            const todayTasks = state.tasks.filter(task => task.date.slice(0, 10) === today && !task.state)
            const tomorrowTasks = state.tasks.filter(task => task.date.slice(0, 10) === tomorrowFormatted && !task.state)
        
            commit('setTodayTasksCount', todayTasks.length)
            commit('setTomorrowTasksCount', tomorrowTasks.length)
        },
        updateNowAction({ commit }) {
            setInterval(() => {
                commit('updateNow')
            }, 1000)
        },
    },
    getters: {
        getTasks: state => {
            return state.tasks.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
        },
        getTodayTasksCount: state => state.today_tasks_count,
        getTomorrowTasksCount: state => state.tomorrow_tasks_count,
        getNow: state => state.now,
        getTodayTasks(state, getters) {
            const today = new Date(new Date().getTime() + 3000 * 60 * 60).toISOString().slice(0, 10)
            const today_tasks = getters.getTasks.filter(task => task.date.slice(0, 10) === today)
            return today_tasks
        },
        getTomorrowTasks(state, getters) {
            const tomorrow = new Date(new Date().getTime() + 3000 * 60 * 60 + 86400000).toISOString().slice(0, 10)
            const tomorrow_tasks = getters.getTasks.filter(task => task.date.slice(0, 10) === tomorrow)
            return tomorrow_tasks
        },
        getLaterTasks(state, getters) {
            const tomorrow = new Date(new Date().getTime() + 3000 * 60 * 60 + 86400000).toISOString().slice(0, 10)
            const later_tasks = getters.getTasks.filter(task => task.date.slice(0, 10) > tomorrow)
            return later_tasks
        },
        getMinDate: () => new Date(new Date().getTime() + 3000 * 60 * 60).toISOString().slice(0, 16)

    },
    strict: true
})


export default store