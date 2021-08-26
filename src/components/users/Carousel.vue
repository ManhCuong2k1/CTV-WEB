<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(user, index) in users" :key="index">
            <Item :user="user" />
        </swiper-slide>
    </swiper>
</template>

<script>
    import Item from './Item.vue';

    export default {
        components: {
            Item,
        },

        props: {
            users: Array,
        },

        data: () => ({
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 10,
                breakpoints: {
                    // when window width is >= 320px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    // when window width is >= 640px
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                },
                navigation: {
                    nextEl: '.el-icon-arrow-left',
                    prevEl: '.el-icon-arrow-right',
                },
            },
        }),
    };
</script>
