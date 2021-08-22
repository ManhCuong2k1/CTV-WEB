<template>
    <div>
        <swiper :options="swiperOption" class="rounded-md">
            <swiper-slide v-for="(category, index) in categories" :key="index">
                <img src="https://i0.wp.com/s1.uphinh.org/2021/08/23/8010020e9c360f0ba9b3969bbc7499c3-2.png">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data: () => ({
            swiperOption: {
                slidesPerView: 1,
            },
        }),

        computed: {
            ...mapState('categories', ['categories']),
        },
    };
</script>
