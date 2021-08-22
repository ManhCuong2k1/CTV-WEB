<template>
    <nuxt-link
        :to="`/products/1`"
        :class="{ 'flex justify-between': !isGrid }"
        class="bg-white border hover:shadow-xl"
    >
        <el-image
            :class="[$style['product-item'], !isGrid ? 'w-32' : '']"
            class="flex justify-center items-center bg-gray-300"
            :src="'https://i0.wp.com/s1.uphinh.org/2021/08/23/Cover.png'"
            fit="fill"
            :autoplay="autoplay"
        >
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline text-lg" />
            </div>
        </el-image>
        <div :class="{ 'flex-grow': !isGrid }" class="p-2">
            <p :class="{ 'h-12': isGrid }" class="overflow-ellipsis overflow-hidden">
                {{ product.name }}
            </p>
            <div class="flex justify-between items-center mb-3">
                <div>
                    <span class="text-lg">Lợi nhuận: </span>
                    <span class="text-red-500 text-xl">50.000</span>
                </div>
            </div>
            <div class="flex justify-between items-center text-xs mb-4">
                <div>Bán lẻ: ******</div>

                <el-tag type="danger" effect="plain" size="mini">
                    <span class="text-xs">Đăng ký TV để xem giá</span>
                </el-tag>
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
    };
</script>

<style lang="scss" module>
    .product-item {
        display: flex !important;
    }
</style>
