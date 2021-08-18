<template>
    <div>
        <swiper ref="swiperImages" :options="swiperImageOptions" class="swiper">
            <swiper-slide v-for="(image, index) in product.images" :key="index">
                <el-image
                    style="width: 100%; aspect-ratio: 5/6"
                    :src="image"
                    :preview-src-list="product.images"
                    fit="fill"
                />
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination" />
        </swiper>
        <swiper ref="swiperThumbs" class="swiper" :options="swiperThumbOption">
            <swiper-slide v-for="(image, index) in product.images" :key="index">
                <el-image
                    style="width: 100%; aspect-ratio: 5/6"
                    :src="image"
                    fit="fill"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                swiperImageOptions: {
                    loopedSlides: 5, // looped slides should be the same
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                },
                swiperThumbOption: {
                    loopedSlides: 5, // looped slides should be the same
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 5,
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                },
            };
        },

        mounted() {
            this.$nextTick(() => {
                const swiperImages = this.$refs.swiperImages.$swiper;
                const swiperThumbs = this.$refs.swiperThumbs.$swiper;
                swiperImages.controller.control = swiperThumbs;
                swiperThumbs.controller.control = swiperImages;
            });
        },
    };
</script>
