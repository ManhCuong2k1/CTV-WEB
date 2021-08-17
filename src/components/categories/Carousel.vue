<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(category, index) in categories" :key="index">
            <Item :category="category" />
        </swiper-slide>
    </swiper>
</template>

<script>
    import { mapState } from 'vuex';
    import Item from './Item.vue';

    export default {
        components: {
            Item,
        },

        data: () => ({
            swiperOption: {
                slidesPerView: 4,
                spaceBetween: 30,
                breakpoints: {
                    // when window width is >= 320px
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 7,
                        spaceBetween: 30,
                    },
                    // when window width is >= 640px
                    1024: {
                        slidesPerView: 8,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 10,
                        spaceBetween: 20,
                    },
                },
            },
        }),

        computed: {
            ...mapState('categories', ['categories']),
        },
    };
</script>
