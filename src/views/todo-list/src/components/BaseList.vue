<template>
    <div class="list-container">
        <div class="list-wrap">
            <div class="list-wrap-item">
                <div class="title"></div>
                <div class="action"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    data?: []
}>()
</script>

<style scoped lang="scss">
.list-container{
    .list-wrap{
        .list-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>
