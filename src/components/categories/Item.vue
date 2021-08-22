<template>
    <nuxt-link :to="`/c/${category.slug}`" class="flex flex-col items-center">
        <div class="rounded-3xl w-24 h-24 mb-2 bg-blue-200 flex justify-center flex-col">
            <img class="w-20 mx-auto" src="https://i0.wp.com/s1.uphinh.org/2021/08/23/sim-den-trang-1.png">
        </div>
        <div class="text-center">
            Sim số đẹp
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
