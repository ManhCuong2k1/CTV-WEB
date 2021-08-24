<template>
    <div>
        <div class="bg-white py-2 px-2 sm:px-0">
            <Banner class="index-section" :banners="banners" />
        </div>

        <div class="bg-white py-6">
            <div class="index-section px-2 sm:px-0">
                <div class="text-lg font-bold mb-2">
                    Danh mục sản phẩm
                </div>
                <CategoriesCarousel />
            </div>
        </div>

        <div class="bg-white mt-2 px-2 sm:px-0">
            <div class="index-section py-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold">Sản phẩm mới</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <ProductsCarousel :products="newProducts" />
            </div>
        </div>

        <div class="index-section mt-6 px-2 sm:px-0">
            <div class="font-bold text-xl text-center">
                Lợi ích thành viên
            </div>
            <div class="mt-6 grid sm:grid-col-3 sm:grid-flow-col sm:gap-4">
                <div
                    v-for="(benefit, index) in benefits"
                    :key="index"
                    class="flex justify-start items-center mb-2 py-5 px-3 bg-white rounded-md"
                >
                    <div class="w-12">
                        <i :class="`${benefit.icon} text-2xl pr-4 pl-2`" />
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
            </div>
            <div class="flex justify-center mt-7">
                <el-button type="warning" class="mx-auto w-96">
                    ĐĂNG KÝ THÀNH VIÊN
                </el-button>
            </div>
            <div class="mt-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold">8.123 Thành viên đang hoạt động</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Đăng ký <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <UsersCarousel />
            </div>
        </div>

        <div class="bg-white py-6 mt-4 px-2 sm:px-0">
            <div class="index-section">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold text-red-500">Top sản phẩm bán chạy</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <ProductsCarousel :products="hotProducts" />
            </div>
        </div>

        <div class="py-6 sm:py-12 px-2 sm:px-0">
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

        <div class="bg-white py-6 mt-4 px-2 sm:px-0">
            <div class="index-section">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-lg font-bold text-red-500">Giá tốt hôm nay</span>
                    <nuxt-link to="/products" class="text-gray-400">
                        Xem tất cả <i class="el-icon-right" />
                    </nuxt-link>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <ProductItem
                        v-for="product in discountProducts"
                        :key="product.id"
                        :product="product"
                        class="p-1"
                    />
                </div>
                <div class="flex justify-center mt-4">
                    <el-button type="primary" size="medium">
                        <span class="md:px-48">Xem tất cả</span>
                    </el-button>
                </div>
            </div>
        </div>

        <div v-if="!isLoggedIn" class="py-6">
            <div class="index-section flex flex-col justify-center items-center">
                <div class="text-lg mb-2">
                    Tham gia cộng đồng BATTAY
                </div>
                <div class="flex items-center">
                    <nuxt-link to="/register">
                        <el-button size="medium" type="warning" class="px-4">
                            ĐĂNG KÝ TÀI KHOẢN
                        </el-button>
                    </nuxt-link>
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
    import { getSpecList } from '~/api/products';
    import { getAll as getBanners } from '~/api/banners';
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

        async asyncData({ store, params }) {
            await store.dispatch('categories/getCategories');
            await store.dispatch('users/getUsers');

            const { data: newProducts } = await getSpecList('new', params);
            const { data: hotProducts } = await getSpecList('hot', params);
            const { data: discountProducts } = await getSpecList('discount', params);
            const { data: banners } = await getBanners();

            return {
                banners,
                newProducts,
                hotProducts,
                discountProducts,
            };
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
            isLoggedIn() {
                return this.$auth.loggedIn;
            },
        },
    };
</script>

<style lang="scss" scope>
    .index-section {
        @apply mx-auto max-w-screen-xl;
    }
</style>
