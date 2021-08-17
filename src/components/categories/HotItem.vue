<template>
    <div class="flex justify-between items-center border border-white p-4 bg-white rounded-lg">
        <div>
            <div class="truncate text-sm">
                {{ category.name }}
            </div>
            <div class="text-gray-400 text-xs">
                1.345 sản phầm
            </div>
        </div>
        <el-image
            :class="$style['category-image']"
            class="flex justify-center items-center bg-gray-300 hover:shadow-xl"
            :src="category.image"
            :fit="fit"
        >
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline text-lg" />
            </div>
        </el-image>
    </div>
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
