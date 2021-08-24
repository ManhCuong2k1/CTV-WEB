<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(product, index) in products" :key="index" class="h-full">
            <Item :product="product" class="h-full" />
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
    </swiper>
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

        data: () => ({
            swiperOption: {
                slidesPerView: 2,
                spaceBetween: 10,
                breakpoints: {
                    // when window width is >= 320px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    // when window width is >= 640px
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1536: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                },
                navigation: {
                    nextEl: '.el-icon-arrow-left',
                    prevEl: '.el-icon-arrow-right',
                },
                autoplay: {
                    delay: 30000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                },
            },
        }),
    };
</script>
