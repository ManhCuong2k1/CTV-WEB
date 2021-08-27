<template>
    <div class="border">
        <div class="flex justify-between items-center border-b px-4 py-2 bg-blue-50">
            <div class="flex items-center">
                <nuxt-link :to="`/agencies/${order.Admin.id}`" class="flex items-center mr-4">
                    <el-avatar :src="order.Admin.avatar" :size="50" icon="el-icon-user-solid" />
                </nuxt-link>
                <div>
                    <nuxt-link :to="`/agencies/${order.Admin.id}`" class="truncate mb-1">
                        {{ order.Admin.name }}
                    </nuxt-link>
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-map-marker-alt mr-1" />{{ order.Admin.District.name }} - {{ order.Admin.City.name }}
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <nuxt-link :to="`/orders/${order.id}`">
                    <el-tag :type="statusOption.type" effect="plain">
                        {{ statusOption.label }}
                    </el-tag>
                </nuxt-link>
                <el-divider direction="vertical" />
                <div class="uppercase text-gray-500">
                    {{ isRetail ? 'Giá bán lẻ' : 'Giá thành viên' }}
                </div>
            </div>
        </div>
        <div class="border-b py-2">
            <div
                v-for="productOrder in order.ProductOrders"
                :key="productOrder.id"
                class="items-center grid grid-cols-10 px-4 py-2"
            >
                <div :class="[!isRetail ? 'col-span-7' : 'col-span-8']" class="flex items-center">
                    <nuxt-link :to="`/products/${productOrder.Product.id}`">
                        <el-image
                            :src="productOrder.Product.avatar"
                            fit="fill"
                            style="aspect-ratio: 1/1; width: 70px"
                            class="rounded-md"
                        >
                            <div slot="error" class="h-full flex justify-center items-center bg-gray-300">
                                <i class="el-icon-picture-outline text-lg" />
                            </div>
                        </el-image>
                    </nuxt-link>
                    <div class="ml-4">
                        <nuxt-link :to="`/products/${productOrder.Product.id}`">
                            {{ productOrder.Product.name }}
                        </nuxt-link>
                        <div>x{{ productOrder.amount }}</div>
                    </div>
                </div>
                <div v-if="!isRetail" class="text-right text-green-500">
                    {{ productOrder.promotionAmount | formatNumber }}₫
                </div>
                <div class="text-right col-span-2">
                    {{ productOrder.total | formatNumber }}₫
                </div>
            </div>
        </div>
        <div>
            <div class="items-center grid grid-cols-10 px-4 py-2">
                <div :class="[!isRetail ? 'col-span-7' : 'col-span-8']" class="flex items-center">
                    Tổng số {{ order.ProductOrders.length | formatNumber }} sản phẩm
                </div>
                <div v-if="!isRetail" class="text-right text-green-500">
                    {{ order.total - order.totalAfterPromotion | formatNumber }}₫
                </div>
                <div class="text-right font-bold text-lg col-span-2">
                    {{ order.total | formatNumber }}₫
                </div>
            </div>
            <div class="flex justify-between items-center px-4 py-2">
                <div class="text-xs text-gray-500 mr-2">
                    {{ order.createdAt | formatDate }}
                </div>
                <nuxt-link :to="`/orders/${order.id}`" class="uppercase text-gray-500">
                    <el-button plain size="medium" type="primary">
                        Xem chi tiết
                    </el-button>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import _find from 'lodash/find';
    import { options as statusOptions } from '~/constants/order/status';

    export default {
        props: {
            order: {
                type: Object,
                required: true,
            },
        },

        data: () => ({
            statusOptions,
        }),

        computed: {
            statusOption() {
                return _find(statusOptions, (_status) => _status.value === this.order.status);
            },

            isRetail() {
                return this.order.priceType === 'retail';
            },
        },
    };
</script>
