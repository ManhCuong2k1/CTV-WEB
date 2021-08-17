<template>
    <el-input
        v-model="value"
        placeholder="Nhập từ khóa cần tìm"
        suffix-icon="fas fa-search text-lg mr-2"
    />
</template>

<script>
    export default {
        data: () => ({
            value: '',
        }),
    };
</script>
