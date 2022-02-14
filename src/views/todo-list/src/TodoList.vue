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
                    <el-scrollbar :max-height="280">
                        <div class="list-container">
                            <div class="list-wrap">
                                <div
                                    v-for="(taskItem, index) in taskList"
                                    :key="taskItem.id"
                                    class="list-wrap-item"
                                >
                                    <div class="title">
                                        {{ taskItem.text }}
                                    </div>
                                    <div class="action">
                                        <el-icon
                                            v-if="task.state !== '3' && task.state !== '0'"
                                            class="icon-btn"
                                            :size="20"
                                            @click="completeItem(taskItem)"
                                        >
                                            <check />
                                        </el-icon>
                                        <el-icon
                                            class="icon-btn"
                                            :size="20"
                                            @click="removeItem(taskItem, index)"
                                        >
                                            <close />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, watch } from 'vue'
import { Close, Check } from '@element-plus/icons-vue'

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

/**
 * 监听任务状态切换，设置对应的任务数据
 */
watch(() => task.state, (v) => {
    if (v === '0') {
        taskList.value = task.data
    } else {
        filterTaskList()
    }
    refreshData()
})

/**
 * 过滤出和当前状态匹配的数据
 */
const filterTaskList = () => {
    taskList.value = task.data.filter(item => item.value === task.state)
}

onMounted(() => {
    /**
     * 页面初始化加载缓存数据
     */
    refreshData()
})

const refreshData = () => {
    const storageData = storage.get('taskList')
    task.data = storageData
    if (task.state !== '0') {
        filterTaskList()
    }
}

// 删除指定条目
const removeItem = (item: TaskInfo, index: number) => {
    if (task.state === '0') {
        task.data.splice(index, 1)
    } else {
        taskList.value.splice(index, 1)
    }
    storage.set('taskList', taskList.value)
}

// 切换任务状态为已完成
const completeItem = (item: TaskInfo) => {
    taskList.value.forEach(task => {
        if (item.id === task.id) {
            task.value = '3'
        }
    })
    storage.set('taskList', taskList.value)
    // refreshData()
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
            ::v-deep .el-tabs__content {
                padding: 0;
            }
        }
    }
}

.list-container {
    background: white;
    .list-wrap {
        padding: 10px;
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: #333;
            transition: all linear 0.3s;
            &:last-child {
                border-bottom: none;
            }
            &:hover {
                background: #eee;
            }
            .icon-btn {
                margin-left: 10px;
                cursor: pointer;
                transition: all ease-in 0.3s;
                &:hover {
                    transform: rotate(360deg);
                }
            }
        }
    }
}
</style>
