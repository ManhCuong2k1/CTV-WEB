<template>
    <el-input
        v-model="value"
        placeholder="Nhập từ khóa cần tìm"
        suffix-icon="fas fa-search text-lg mr-2"
        @keyup.native.enter.prevent="onSearch"
    />
</template>

<script>
    export default {
        data: () => ({
            value: '',
        }),

        methods: {
            onSearch() {
                this.$router.push(`/search?q=${this.value}`);
            },
        },
    };
</script>
