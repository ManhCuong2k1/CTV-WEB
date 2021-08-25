<template>
    <nuxt-link
        :to="`/products/${product.id}`"
        :class="{ 'flex justify-between': !isGrid }"
        class="bg-white border hover:shadow-xl"
    >
        <el-image
            :class="[$style['product-item'], !isGrid ? 'w-32' : '']"
            class="flex justify-center items-center bg-gray-300"
            :src="product.avatar"
            fit="fill"
            :autoplay="autoplay"
        >
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline text-lg" />
            </div>
        </el-image>
        <div :class="{ 'flex-grow': !isGrid }" class="p-2">
            <div :class="{ 'h-12': isGrid }" class="overflow-ellipsis overflow-hidden">
                {{ product.name }}
            </div>
            <div class="flex justify-between items-center mb-2 flex-wrap">
                <div>Lợi nhuận: </div>
                <div class="text-red-500 text-lg font-bold">{{ product.price - product.promotionPrice | formatNumber }}₫</div>
            </div>
            <div class="flex justify-between items-center text-xs mb-4">
                <div>Bán lẻ:</div>
                <div v-if="isLoggedIn">
                    {{ product.price | formatNumber }}₫
                </div>
                <nuxt-link v-else to="/login">
                    <el-tag
                        type="danger"
                        effect="plain"
                        size="mini"
                    >
                        <span class="text-xs">Đăng ký TV để xem giá</span>
                    </el-tag>
                </nuxt-link>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
            autoplay: {
                type: Boolean,
                default: true,
            },
            isGrid: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            isLoggedIn() {
                return this.$auth.loggedIn;
            },
        },
    };
</script>

<style lang="scss" module>
    .product-item {
        display: flex !important;
        aspect-ratio: 11/12;
    }
</style>
