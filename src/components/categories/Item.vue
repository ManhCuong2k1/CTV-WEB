<template>
    <nuxt-link :to="`/category/${category.id}`" class="flex flex-col items-center">
        <div class="rounded-3xl w-24 h-24 mb-2 flex justify-center flex-col">
            <img class="w-20 mx-auto" :src="category.avatar">
        </div>
        <div class="text-center truncate">
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
