<template>
    <div class="todo-list-container">
        <el-card class="box-card">
            <el-input
                v-model.trim="todoText"
                placeholder="Please input"
                clearable
                @keyup.enter="submitTodoTask"
            >
                <template #prepend>
                    <el-select
                        v-model="taskState"
                        placeholder="任务状态"
                        style="width: 100px"
                    >
                        <el-option
                            v-for="item in taskOptions"
                            :key="item.text"
                            :label="item.text"
                            :value="item.value"
                        />
                    </el-select>
                </template>
            </el-input>
            <el-tabs
                type="border-card"
                class="todo-list-tab"
                @tab-click="onTabChange"
            >
                <el-tab-pane
                    v-for="tab in taskOptions"
                    :key="tab.text"
                    :label="tab.text"
                >
                    <p
                        v-for="task in taskList"
                        :key="task.id"
                    >
                        {{ task.text }}
                    </p>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { TabsPaneContext } from 'element-plus'
import { reactive, ref } from 'vue'

type TaskOption = Partial<typeof taskOptions[number]>

const taskOptions = reactive([
    {
        text: '待处理',
        value: '1'
    },
    {
        text: '进行中',
        value: '2'
    },
    {
        text: '已完成',
        value: '3'
    },
    {
        text: 'ALL',
        value: '0'
    }
])

const todoText = ref('')
const taskList = reactive<{
    id: number;
    value: string;
    text: string;
}[]>([])
const taskState = ref<TaskOption['value']>('1')
const submitTodoTask = () => {
    console.log(todoText.value)
    taskList.unshift({
        value: taskState.value as string,
        text: todoText.value,
        id: new Date().getTime()
    })
    todoText.value = ''
}

const onTabChange = (tab: TabsPaneContext) => {
    console.log(tab.paneName)
    console.log(tab.props)
    console.log(tab.index)
    console.log(tab.instance)

}
</script>

<style scoped lang="scss">
.todo-list-container {
    padding: 100px;
    height: 100%;
    .box-card {
        padding: 20px 60px;
        min-width: 600px;
        height: 480px;
        .todo-list-tab {
            margin-top: 28px;
            height: 320px;
        }
    }
}
</style>
