<template>
    <el-autocomplete
        v-model="value"
        class="w-full"
        placeholder="Nhập từ khóa cần tìm"
        :fetch-suggestions="querySearch"
        suffix-icon="fas fa-search text-lg mr-2"
        @keyup.native.enter.prevent="onSearch"
        @select="onSearch"
    />
</template>

<script>
    import _map from 'lodash/map';
    import { getHistories } from '~/api/search';

    export default {
        data: () => ({
            value: '',
        }),

        methods: {
            onSearch() {
                this.$router.push(`/search?keyword=${this.value}`);
            },

            async querySearch(queryString, cb) {
                const { data: histories } = await getHistories();
                cb(_map(histories, (history) => ({ value: history.name })));
            },
        },
    };
</script>
