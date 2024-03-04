<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        computed: {
            ...mapGetters(['getTasks']),
            sortedTasks() {
                return this.getTasks
            },
            minDate() {
                const currentDate = new Date();
                return currentDate.toISOString().slice(0, 16);
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
            updateTaskDate(event, task) {
                const updatedTask = { ...task, date: event.target.value }
                this.updateTaskOnServer(updatedTask)

                if (!event.target.value) {
                    event.target.reportValidity();
                }
            },
            checkDateEmpty(event, task) {
                this.$nextTick(() => {
                    if (!task.date) {
                        event.target.focus()
                    }
                })
            },
            addTask() {
                const randomID = Math.floor(Math.random() * 1000).toString()

                const titleArray = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ')
                const randomTitle = titleArray[Math.floor(Math.random() * titleArray.length)]

                const randomDate = new Date(new Date().getTime() + Math.floor(Math.random() * 604800000)).toISOString().slice(0, 16)
                

                const newTask = { id: randomID, state: false, title: randomTitle, date: randomDate}
                this.addTaskOnServer(newTask);
            },
            removeTask(task) {
                if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
                    this.removeTaskOnServer(task)
                } 
            },
        },
        created() {
            this.$store.dispatch('fetchTasks')
        }
    };
</script>

<template>  
    <div class="task-container">
        <ul>
            <li v-for="task in sortedTasks" :key="task.id" v-bind:style="{background: task.state ? '#83B496' : '#83B4BD', transition: '120ms'}">
                <form class="taskCard">
                    <input class="custom-checkbox" type="checkbox" :checked="task.state" @change="updateTaskState(task)"/>
                    <input class="title" type="text" maxlength="100" :value="task.title" placeholder="Введите заголовок" @input="updateTaskTitle($event, task)" v-bind:style="{textDecoration: task.state ? 'line-through': 'none'}">
                    <input class="date" type="datetime-local" :value="task.date" @blur="checkDateEmpty($event, task)" required @input="updateTaskDate($event, task)" v-bind:style="{opacity: task.state ? '0' : '1', transition: '120ms'}" v-bind:min="minDate">
                    <button class="remove-btn" @click="removeTask(task)">&#10005;</button>
                </form>
            </li>
            <button @click="addTask" class="addTask">+</button>
        </ul>
        
  </div>
</template>

<style scoped>
    .task-container {
        display: flex;
        justify-content: center;
    }

    ul {
        margin-top: 2vw;
        list-style: none;
        flex-direction: column;
        justify-content: center;
        display: flex;
        width: 90%;
    }

    li {
        width: 100%;
        height: 2em;
        background-color: #83B4BD;
        border-radius: .25em;
        margin-bottom: 1em;
        display: flex;;
        align-items: center;
        justify-content: center;
    }
    
    .taskCard {
        display: flex;
        justify-content: space-between;
        width: 98%;

        .custom-checkbox {
            width: 2em;
            height: 2em;
            margin-left: .5em;
        }
        .title {
            background-color: transparent;
            border: 0;
            outline: none;
            width: 70%;
            font-size: 16px;
            font-weight: 500;

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
            padding: 0px 1em;
            border-radius: .5em;
            border: 0;
        }

        &:hover {
            .remove-btn {
                opacity: 1;
            }
        }
    }
    
    .addTask {
        width: 40%;
        height: 2em;
        font-size: 36px;
        color: #554c4c;
        border-radius: .7em;
        border: 2px dashed #b19d9d;
        cursor: pointer;
        margin: 0 auto;
        transition: 120ms ease-in-out;

        &:hover {
            background-color: #a6ccd3;
            border-color: #f5f5f5;
            color: #ffffff;
        }
    }

    .remove-btn {
        width: 2em;
        height: 2em;
        font-weight: bold;
        border: 0;
        cursor: pointer;
        position: absolute;
        right: 2.5em;
        opacity: 0;
        border-radius: .3em;
        background-color: rgba(255, 47, 47, 0.534);
        color: #ffffff;
        transition: 120ms ease-in-out;
        &:hover {
            opacity: 1;
            background-color: red;
        }
    }

    .taskCard:hover ~ .remove-btn {
        opacity: 1;
    }

</style>