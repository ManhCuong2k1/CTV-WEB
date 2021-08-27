<template>
    <div>
        <div>
            <OrderItem
                v-for="order in orders"
                :key="order.id"
                :order="order"
                class="mb-12"
            />
        </div>
        <div class="flex justify-center">
            <el-button>
                <span class="px-60">Xem thêm</span>
            </el-button>
        </div>
    </div>
</template>

<script>
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
            };
        },
    };
</script>
