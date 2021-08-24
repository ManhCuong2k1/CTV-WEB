<template>
    <swiper :options="swiperOption" class="rounded-md" style="height: 400px;">
        <swiper-slide v-for="banner in banners" :key="banner.id">
            <img :src="getImage(banner.image)">
        </swiper-slide>
    </swiper>
</template>

<script>
    import { image as getImage } from '~/utils/url';

    export default {
        props: {
            banners: {
                type: Array,
                required: true,
            },
        },

        data: () => ({
            swiperOption: {
                slidesPerView: 1,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
            },
        }),

        methods: {
            getImage,
        },
    };
</script>
