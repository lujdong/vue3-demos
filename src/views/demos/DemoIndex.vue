<template>
    <div class="demo-container">
        <el-container>
            <el-aside
                width="220px"
                class="sidebar"
            >
                <el-menu
                    class="sidebar-menu"
                    router
                    :default-active="defaultActive"
                >
                    <el-menu-item
                        v-for="menu in demoRoutes"
                        :key="menu.path"
                        :index="menu.path"
                        :route="menu"
                        @click="onMenuSelected"
                    >
                        <el-icon><reading /></el-icon>
                        <template #title>
                            {{ menu.name }}
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { Reading } from '@element-plus/icons-vue'
import demoRoutes from '@/router/modules/demos'
import {MenuItemRegistered} from 'element-plus'
import { computed } from 'vue'

const defaultActive = computed(() => demoRoutes[0].path)

const onMenuSelected = (menu: MenuItemRegistered) => {
    console.log(menu)

}
</script>

<style scoped>
.sidebar-menu{
    height: 100vh;
}
</style>
