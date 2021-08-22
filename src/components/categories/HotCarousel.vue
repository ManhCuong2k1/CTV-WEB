<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(category, index) in categories" :key="index">
            <HotItem :category="category" />
        </swiper-slide>
    </swiper>
</template>

<script>
    import { mapState } from 'vuex';
    import HotItem from './HotItem.vue';

    export default {
        components: {
            HotItem,
        },

        data: () => ({
            swiperOption: {
                slidesPerView: 1.6,
                spaceBetween: 10,
                breakpoints: {
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1536: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                },
            },
        }),

        computed: {
            ...mapState('categories', ['categories']),
        },
    };
</script>
