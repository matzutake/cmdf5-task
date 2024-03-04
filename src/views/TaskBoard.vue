<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['getTodayTasks', 'getTomorrowTasks', 'getLaterTasks', 'getMinDate']),
            todayTasks() {
                return this.getTodayTasks
            },
            tomorrowTasks() {
                return this.getTomorrowTasks
            },
            laterTasks() {
                return this.getLaterTasks
            }
        },
        methods: {
            ...mapActions(['updateTaskOnServer', 'addTaskOnServer', 'removeTaskOnServer']),
            updateTaskState(task) {
                const updatedTask = { ...task, state: !task.state }
                this.updateTaskOnServer(updatedTask)
            },
            updateTaskTitle(event, task) {
                const updatedTask = { ...task, title: event.target.value }
                this.updateTaskOnServer(updatedTask)
            },
            updateTaskToday(event, task) {
                const updatedTask = { ...task, date: (new Date().toISOString().slice(0, 11) + event.target.value) }
                this.updateTaskOnServer(updatedTask)

                if (!event.target.value) {
                    event.target.reportValidity()
                }
            },
            updateTaskTomorrow(event, task) {
                const updatedTask = { ...task, date: (new Date(new Date().getTime() + 24 * 3600 * 1000).toISOString().slice(0, 11) + event.target.value) }
                this.updateTaskOnServer(updatedTask)

                if (!event.target.value) {
                    event.target.reportValidity()
                }
            },
            updateTaskLater(event, task) {
                console.log(event.target.value)
                const updatedTask = { ...task, date: event.target.value + 'T00:00' }
                this.updateTaskOnServer(updatedTask)

                if (!event.target.value) {
                    event.target.reportValidity()
                }
            },
            addTaskToday() {
                const randomID = Math.floor(Math.random() * 1000).toString()

                const titleArray = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ')
                const randomTitle = titleArray[Math.floor(Math.random() * titleArray.length)]

                const randomDate = new Date().toISOString().slice(0, 11) + Math.floor(Math.random() * 23).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 59).toString().padStart(2, '0')

                const newTask = { id: randomID, state: false, title: randomTitle, date: randomDate}
                this.addTaskOnServer(newTask);
            },
            addTaskTomorrow() {
                const randomID = Math.floor(Math.random() * 1000).toString()

                const titleArray = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ')
                const randomTitle = titleArray[Math.floor(Math.random() * titleArray.length)]

                const randomDate = new Date(new Date().getTime() + 24 * 3600 * 1000).toISOString().slice(0, 11) + Math.floor(Math.random() * 23).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 59).toString().padStart(2, '0')

                const newTask = { id: randomID, state: false, title: randomTitle, date: randomDate}
                this.addTaskOnServer(newTask);
            },
            addTaskLater() {
                const randomID = Math.floor(Math.random() * 1000).toString()

                const titleArray = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ')
                const randomTitle = titleArray[Math.floor(Math.random() * titleArray.length)]

                const randomDate = new Date(new Date().getTime() + 48 * 3600 * 1000).toISOString().slice(0, 11) + Math.floor(Math.random() * 23).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 59).toString().padStart(2, '0')

                const newTask = { id: randomID, state: false, title: randomTitle, date: randomDate}
                this.addTaskOnServer(newTask);
            },
        },
        created() {
            this.$store.dispatch('fetchTasks')
        }
    }
</script>

<template>
    <div class="desk-container">
        <div class="today">
            <h3>Сегодня</h3>
            <ul>
                <li v-for="task in todayTasks" :key="task.id" v-bind:style="{background: task.state ? '#83B496' : '#83B4BD', transition: '120ms'}">
                    <form class="taskCard">
                        <input class="custom-checkbox" type="checkbox" :checked="task.state" @change="updateTaskState(task)"/>
                        <input class="desk-title" type="text" maxlength="100" :value="task.title" placeholder="Введите заголовок" @input="updateTaskTitle($event, task)" v-bind:style="{textDecoration: task.state ? 'line-through' : 'none'}"/>
                        <input class="time" type="time" :value="task.date.slice(11, 16)" @input="updateTaskToday($event, task)" v-bind:style="{opacity: task.state ? '0' : '1', transition: '120ms'}"/>
                    </form>
                </li>
                <button class="addTask" @click="addTaskToday">+</button>
            </ul>
        </div>
        <div class="tomorrow">
            <h3>Завтра</h3>
            <ul>
                <li v-for="task in tomorrowTasks" :key="task.id" v-bind:style="{background: task.state ? '#83B496' : '#83B4BD', transition: '120ms'}">
                    <form class="taskCard">
                        <input class="custom-checkbox" type="checkbox" :checked="task.state" @change="updateTaskState(task)"/>
                        <input class="desk-title" type="text" maxlength="100" :value="task.title" placeholder="Введите заголовок" @input="updateTaskTitle($event, task)" v-bind:style="{textDecoration: task.state ? 'line-through' : 'none'}"/>
                        <input class="time" type="time" :value="task.date.slice(11, 16)" @input="updateTaskTime($event, task)" v-bind:style="{opacity: task.state ? '0' : '1', transition: '120ms'}"/>
                    </form>
                </li>
                <button class="addTask" @click="addTaskTomorrow">+</button>
            </ul>
        </div>
        <div class="later">
            <h3>Позже</h3>
            <ul>
                <li v-for="task in laterTasks" :key="task.id" v-bind:style="{background: task.state ? '#83B496' : '#83B4BD', transition: '120ms'}">
                    <form class="taskCard">
                        <input class="custom-checkbox" type="checkbox" :checked="task.state" @change="updateTaskState(task)"/>
                        <input class="desk-title" type="text" maxlength="100" :value="task.title" placeholder="Введите заголовок" @input="updateTaskTitle($event, task)" v-bind:style="{textDecoration: task.state ? 'line-through' : 'none'}"/>
                        <input class="date" type="date" :value="task.date.slice(0, 10)" v-bind:min="getMinDate" @input="updateTaskLater($event, task)" v-bind:style="{opacity: task.state ? '0' : '1', transition: '120ms'}"/>
                    </form>
                </li>
                <button class="addTask" @click="addTaskLater">+</button>
            </ul>
        </div>
    </div>
</template>

<style>
    .desk-container {
        display: flex;
        justify-content: space-between;
        min-height: 100vh;
    }
    
    h3 {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    ul {
        list-style: none;
        flex-direction: column;
        margin: 0 auto;
        display: flex;
        width: 90%;
    }

    .addTask {
        width: 50%;
        height: 1.5em;
        font-size: 36px;
        color: #554c4c;
        border-radius: .7em;
        border: 2px dashed #b19d9d;
        cursor: pointer;
        margin: 0 auto;
        margin-top: 1em;
        transition: 120ms ease-in-out;  

        &:hover {
            background-color: #a6ccd3;
            border-color: #f5f5f5;
            color: #ffffff;
        }
    }

    li {
        width: 100%;
        height: 4em;
        border-radius: .5em;
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .today, .tomorrow, .later {
        text-align: center;
        width: 100%;
    }

    .today, .tomorrow {
        border-right: 2px solid lightgray;
    }

    .taskCard {
        display: flex;
        justify-content: space-between;
        width: 95%;

        .custom-checkbox {
            width: 2em;
            height: 2em;
            margin-left: .5em;
        }
        .desk-title {
            background-color: transparent;
            border: 0;
            outline: none;
            font-size: 16px;
            font-weight: 500;
            text-align: center;

            &::placeholder {
                font-style: italic;
            }
        }

        input[type="checkbox"] {
            display: grid;
            grid-template-columns: 1em auto;
            gap: .5em;
            appearance: none;
            background-color: #f5f5f5;
            margin: 0;
            width: 2em;
            height: 2em;
            border: 0.05em solid gray;
            border-radius: .15em;
            margin-left: .5em;
            place-content: center;
            cursor: pointer;

            &::before {
                content: '';
                width: 1.5em;
                height: 1.5em;
                transform: scaleY(0);
                transition: 120ms transform ease-in-out;
                transform-origin: bottom left;
                box-shadow: inset 2em 2em green;
                clip-path: polygon(13% 44%, 41% 71%, 82% 4%, 100% 15%, 43% 100%, 0 61%);
            }

            &:checked::before {
                transform: scaleY(1);
            }
        }

        .date {
            border-radius: .5em;
            border: 0;
        }

        &:hover {
            .remove-btn {
                opacity: 1;
            }
        }
    }
    
</style>