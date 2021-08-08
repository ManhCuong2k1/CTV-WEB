<template>
    <div>
        <el-pagination
            v-if="total > 1"
            :page-size="pageSize"
            :pager-count="pagerCount"
            :total="total"
            :current-page="currentPage"
            class="text-center mt-5"
            background
            layout="prev, pager, next"
            @current-change="go"
        />
    </div>
</template>

<script>
    import _omit from 'lodash/omit';
    import _assign from 'lodash/assign';

    export default {
        props: {
            pageSize: {
                type: Number,
                default: 12,
            },
            pagerCount: {
                type: Number,
                default: 7,
            },
            total: {
                type: Number,
                require: true,
            },
            currentPage: {
                type: Number,
                default: 1,
            },
            queryParam: {
                type: String,
                default: 'page',
            },
        },

        methods: {
            go(page) {
                this.$emit('changePage', page);
                this.$router.push(this.to(page));
            },

            to(page) {
                const path = this.$route.path;

                const otherParams = _omit(this.$route.query, [this.queryParam]);
                const query = page !== 1
                    ? _assign({}, otherParams, { [this.queryParam]: page })
                    : otherParams;

                return { path, query };
            },
        },
    };
</script>
