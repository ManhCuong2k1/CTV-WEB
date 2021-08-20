<template>
    <div class="flex flex-wrap products-list">
        <div v-for="product in products" :key="product.id" class="flex-grow">
            <Item :product="product" class="p-1" />
        </div>
    </div>
</template>

<script>
    import Item from './Item.vue';

    export default {
        components: {
            Item,
        },

        props: {
            products: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .products-list::after {
        content: "  ";
        flex: auto;
    }
</style>
