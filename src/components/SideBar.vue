<script>
import { mapGetters, mapActions} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'getTodayTasksCount',
                'getTomorrowTasksCount',
                'getNow',
            ])
        },
        methods: {
            ...mapActions([
                
            ])
        },
        created() {
            this.$store.dispatch("updateNowAction")
        }
    }
</script>

<template>
    <h2>Мои задачи</h2>

    <router-link to="/task-list" class="router-link">
        <button class="router-btn">Список задач</button>
    </router-link>
    <router-link to="/task-board" class="router-link">
        <button class="router-btn">Канбан-доска</button>
    </router-link>

    <div class="tasksLeft">
        <p>На сегодня : <span v-bind:style="{color: 'green', fontWeight: 'bold'}">{{ getTodayTasksCount }}</span></p>
        <p>На завтра : <span v-bind:style="{color: 'blue', fontWeight: 'bold'}">{{ getTomorrowTasksCount }}</span></p>
    </div>

    <div class="online-time">
        <span>{{ getNow[0] }}</span>
        <br/>
        <span>{{ getNow[1] }}</span>
    </div>
</template>

<style scoped>
    .router-btn {
        width: 70%;
        border-radius: .3em;
        border: 0;
        height: 2.5em;
        font-weight: 600;
        margin-top: 1.5em;
        font-size: 15px;
        cursor: pointer;
        transition: .3s ease-in-out;
        opacity: .3;
        background-color: rgb(64, 138, 151);
    }

    .router-link-active {
        .router-btn {
            color: #f5f5f5;
            opacity: 1;
        }
    }

    .online-time {
        margin-top: 35em;
    }
    .tasksLeft {
        margin-top: 2em;
        p {
            margin-top: .25em;
        }
    }

    h2 {
        margin-top: 50px;
    }
</style>