<template>
    <nuxt-link :to="`/c/${category.slug}`" class="flex flex-col items-center">
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
        <div class="text-center">
            {{ category.name }}
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            category: {
                type: Object,
                requried: true,
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
