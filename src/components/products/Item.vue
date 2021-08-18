<template>
    <nuxt-link
        :to="`/products/1`"
        :class="{ 'flex justify-between': !isGrid }"
        class="bg-white border hover:shadow-xl"
    >
        <el-image
            :class="[$style['product-item'], !isGrid ? 'w-32' : '']"
            class="flex justify-center items-center bg-gray-300"
            :src="product.image"
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
            <div class="flex justify-between items-center">
                <el-tag type="danger" effect="plain" size="mini">
                    <span class="text-xs">Đăng ký TV để xem giá</span>
                </el-tag>
                <el-button type="text" class="px-2">
                    <i class="far fa-heart text-lg text-gray-400" />
                </el-button>
            </div>
            <div class="flex justify-between items-center text-xs">
                <div>Bán lẻ: ******</div>
                <div>
                    Lợi nhuận: <span class="text-red-500">50.000</span>
                </div>
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
        aspect-ratio: 10/12;
    }
</style>
