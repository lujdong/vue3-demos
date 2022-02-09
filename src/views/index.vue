<template>
    <div class="index-container">
        <el-button
            type="primary"
            @click="openViewDoor"
        >
            打开新世界的大门
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const openViewDoor = () => {
    router.push('/demos')
}
</script>

<style lang="scss" scoped>
.index-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5) url('https://w.wallhaven.cc/full/rd/wallhaven-rdwjj7.jpg') no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
}
</style>
