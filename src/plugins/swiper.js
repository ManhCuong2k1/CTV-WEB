import Vue from 'vue';
import {
    Swiper as SwiperClass,
    Pagination,
    Mousewheel,
    Autoplay,
    Navigation,
    Lazy,
} from 'swiper/core';

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css';

SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation, Lazy]);
Vue.use(getAwesomeSwiper(SwiperClass));
