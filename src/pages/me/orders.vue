<template>
    <div>
        <div class="font-bold text-xl">
            <i class="text-xl el-icon-shopping-cart-full" />
            Lịch sử Order
        </div>
        <el-divider />
        <div>
            <OrderItem
                v-for="order in orders"
                :key="order.id"
                :order="order"
                class="mb-12"
            />
        </div>
        <div v-if="pagination.page < pagination.totalPage" class="flex justify-center">
            <el-button @click="loadMore">
                <span class="px-60">Xem thêm</span>
            </el-button>
        </div>
    </div>
</template>

<script>
    import _concat from 'lodash/concat';
    import { getOrders } from '~/api/orders';
    import OrderItem from '~/components/orders/Item.vue';

    export default {
        components: {
            OrderItem,
        },

        async asyncData() {
            const res = await getOrders();

            return {
                orders: res.data,
                pagination: {
                    page: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    totalPage: Math.ceil(res.total / res.pageSize),
                },
            };
        },

        methods: {
            async loadMore() {
                const query = this.$route.query;
                query.page = this.pagination.page + 1;
                const res = await getOrders(query);
                this.orders = _concat(this.orders, res.data);
                this.pagination = {
                    page: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    totalPage: Math.ceil(res.total / res.pageSize),
                };
            },
        },
    };
</script>
