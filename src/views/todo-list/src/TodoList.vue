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
                        v-model="task.state"
                        placeholder="任务状态"
                        style="width: 100px"
                    >
                        <el-option
                            v-for="item in task.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </template>
            </el-input>
            <el-tabs
                v-model="task.state"
                type="border-card"
                class="todo-list-tab"
            >
                <el-tab-pane
                    v-for="tab in task.options"
                    :key="tab.label"
                    :label="tab.label"
                    :name="tab.value"
                >
                    <p
                        v-for="taskItem in taskList"
                        :key="taskItem.id"
                    >
                        {{ taskItem.text }}
                    </p>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, watch } from 'vue'

interface TaskOption {
    label: '待处理' | '进行中' | '已完成' | 'ALL',
    value: '1' | '2' | '3' | '0'
}

interface TaskInfo {
    id: number;
    text: string;
    value: string;
}

// 输入文本
const todoText = ref('')

const task = reactive<{ state: TaskOption['value']; options: TaskOption[]; data: TaskInfo[] }>({
    state: '1',
    options: [
        { label: '待处理', value: '1' },
        { label: '进行中', value: '2' },
        { label: '已完成', value: '3' },
        { label: 'ALL', value: '0' }
    ],
    data: []
})

const todoId = ref(1)
const submitTodoTask = () => {
    if (!todoText.value) {
        ElMessage.warning('请输入任务文本')
        return false
    }

    const taskData = {
        id: todoId.value++,
        text: todoText.value,
        value: task.state
    }
    task.data.unshift(taskData)
    taskList.value.unshift(taskData)
    storage.set('taskList', task.data)
    todoText.value = ''
}

const taskList = ref<TaskInfo[]>([])

watch(() => task.state, (v) => {
    if (v === '0') {
        taskList.value = task.data
    } else {
        filterTaskList()
    }
})

const filterTaskList = () => {
    taskList.value = task.data.filter(item => item.value === task.state)
}

onMounted(() => {
    const storageData = storage.get('taskList')
    if(storageData.length){
        task.data = storageData
        filterTaskList()
    }
})
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
