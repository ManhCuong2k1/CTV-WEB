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
                slidesPerView: 2,
                spaceBetween: 10,
                breakpoints: {
                    // when window width is >= 320px
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    // when window width is >= 640px
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
