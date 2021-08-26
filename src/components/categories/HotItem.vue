<template>
    <nuxt-link :to="`/search?categoryId=${category.id}`" class="flex justify-between items-center border border-white p-4 bg-white rounded-lg">
        <div>
            <div class="truncate text-sm">
                {{ category.name }}
            </div>
            <div class="text-gray-400 text-xs">
                1.345 sản phầm
            </div>
        </div>
        <div class="rounded-3xl w-24 h-24 mb-2 bg-blue-200 flex justify-center flex-col">
            <el-image
                class="w-20 mx-auto"
                :src="category.avatar"
                fit="fill"
            />
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            category: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" module>
    .category-image {
        width: 80px;
        height: 80px;
        border-radius: 30%;
        display: flex !important;
    }
</style>
