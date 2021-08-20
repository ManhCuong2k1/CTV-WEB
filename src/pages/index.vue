<template>
    <div>
        <div class="bg-white">
            <Banner class="index-section" />
        </div>

        <div class="bg-white py-6">
            <div class="index-section">
                <div class="text-lg font-bold mb-2">
                    Danh mục
                </div>
                <CategoriesCarousel />
            </div>
        </div>

        <div class="bg-white mt-2">
            <div class="index-section py-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold">Sản phẩm mới</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <ProductsCarousel :products="products" />
            </div>
        </div>

        <div class="index-section">
            <div class="mt-6 mx-auto w-3/4 lg:w-5/12">
                <div class="font-bold text-xl text-center">
                    Lợi ích thành viên
                </div>
                <div
                    v-for="(benefit, index) in benefits"
                    :key="index"
                    class="flex justify-start items-center py-2"
                >
                    <div class="w-12">
                        <i :class="`${benefit.icon} text-2xl pr-4`" />
                    </div>
                    <div>
                        <div class="font-bold">
                            {{ benefit.title }}
                        </div>
                        <p>
                            {{ benefit.content }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-center mt-2">
                    <el-button icon="fas fa-headset mr-1" type="warning" class="mx-auto">
                        Đăng ký thành viên
                    </el-button>
                </div>
            </div>
            <div class="mt-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold">8.123 TV đang hoạt động</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Đăng ký TV <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <UsersCarousel />
            </div>
        </div>

        <div class="bg-white py-6 mt-4">
            <div class="index-section">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold text-red-500">Top sản phẩm bán chạy</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <ProductsCarousel :products="products" />
            </div>
        </div>

        <div class="py-6">
            <div class="index-section">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg text-blue-500 font-bold">
                        <i class="fas fa-chart-line" /> Nhóm hàng dễ bán
                    </span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <HotCategory />
            </div>
        </div>

        <div class="bg-white py-6 mt-4">
            <div class="index-section">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold text-red-500">Giá tốt hôm nay</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <el-row :gutter="0">
                    <el-col
                        v-for="index in 30"
                        :key="index"
                        :xs="12"
                        :sm="8"
                        :md="6"
                        :lg="4"
                    >
                        <ProductItem :product="products[0]" class="p-1" />
                    </el-col>
                </el-row>
                <div class="flex justify-center mt-4">
                    <el-button type="primary" size="medium">
                        <span class="px-48">Xem tất cả</span>
                    </el-button>
                </div>
            </div>
        </div>

        <div class="py-6">
            <div class="index-section flex flex-col justify-center items-center">
                <div class="text-lg mb-2">Tham gia cộng đồng CTVpro</div>
                <div class="flex items-center">
                    <el-button size="medium" type="warning" class="px-4">ĐĂNG KÝ TÀI KHOẢN</el-button>
                    <el-button type="text" class="ml-2">
                        hoặc <span class="underline">Đăng nhập</span>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Banner from '~/components/layout/Banner.vue';
    import CategoriesCarousel from '~/components/categories/Carousel.vue';
    import ProductsCarousel from '~/components/products/Carousel.vue';
    import UsersCarousel from '~/components/users/Carousel.vue';
    import HotCategory from '~/components/categories/HotCarousel.vue';
    import ProductItem from '~/components/products/Item.vue';

    export default {
        components: {
            Banner,
            CategoriesCarousel,
            HotCategory,
            ProductItem,
            ProductsCarousel,
            UsersCarousel,
        },

        async asyncData({ store }) {
            await store.dispatch('categories/getCategories');
            await store.dispatch('products/getProducts');
            await store.dispatch('users/getUsers');
        },

        data: () => ({
            benefits: [{
                icon: 'fas fa-chart-line text-blue-400',
                title: 'Tăng thu nhập lên tới 10 triệu/tháng',
                content: 'Đa dạng chương trình ưu đãi đến từ nhãn hàng CTVpro.',
            }, {
                icon: 'far fa-calendar-alt text-yellow-400',
                title: 'Đặt hàng tiện lợi 24/7',
                content: 'Thoải mái đặt nhiều mặt hàng suốt 24 giờ một ngày trong 7 tuần.',
            }, {
                icon: 'fas fa-truck text-green-400',
                title: 'Giao hàng siêu tốc',
                content: 'Giao hàng trong 24 giờ kể từ khi đặt hàng, bao gồm cả ngày thứ 7 và Chủ nhật.',
            }],
        }),

        computed: {
            ...mapState('products', ['products']),
        },
    };
</script>

<style lang="scss" scope>
    .index-section {
        @apply mx-auto lg:w-8/12;
    }
</style>
