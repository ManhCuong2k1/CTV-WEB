<template>
    <ContentView :links="navbarLinks">
        <div class="mx-auto lg:w-8/12 bg-white p-4 px-8">
            <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                    <ImagePreview :product="product" />
                </el-col>
                <el-col :xs="24" :sm="14">
                    <div class="flex items-center">
                        <el-tag type="success" size="medium" class="mr-2">Hàng có sẵn</el-tag>
                        <span class="font-bold text-lg">{{ product.name }}</span>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                        <div class="flex text-xs">
                            <div class="mr-2">
                                Mã SP: <span class="font-bold">{{ product.slug }}</span>
                            </div>
                            <div>
                                Ghi chú: <span class="font-bold">{{ product.note }}</span>
                            </div>
                        </div>
                        <el-tooltip content="Thêm vào danh sách yêu thích" effect="light">
                            <el-button type="text">
                                <i class="far fa-heart text-2xl text-red-500" />
                            </el-button>
                        </el-tooltip>
                    </div>
                    <el-divider class="m-0" />
                    <div class="mt-2">
                        Giá bán lẻ tham khảo: <span class="text-red-500 text-xl">{{ product.price | formatNumber }}₫</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            Giá Thành viên: <span class="text-red-500 text-xl">{{ product.member_price | formatNumber }}₫</span>
                        </div>
                        <div>
                            Lợi nhuận: <span class="text-red-500 text-xl">{{ product.price - product.member_price | formatNumber }}₫</span>
                        </div>
                    </div>
                    <el-form
                        class="mt-6"
                        label-position="left"
                        label-width="150px"
                        size="mini"
                    >
                        <el-form-item label="Vận chuyển">
                            <el-button type="text">
                                Chọn địa chỉ giao hàng
                            </el-button>
                        </el-form-item>
                        <el-form-item label="Số lượng">
                            <el-input-number size="small" :min="1" :max="10" />
                            <span class="text-gray-500 ml-2">({{ 1234 | formatNumber }} sản phẩm có sẵn)</span>
                        </el-form-item>
                    </el-form>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <el-button type="danger" plain size="medium">
                                <div class="flex items-center">
                                    <i class="el-icon-shopping-cart-1 text-lg mr-1" /> Thêm vào giỏ hàng
                                </div>
                            </el-button>
                            <el-button type="danger">
                                Mua ngay
                            </el-button>
                        </div>
                        <div class="flex items-center">
                            <span>Chia sẻ:</span>
                            <span class="text-2xl ml-2">
                                <i class="fab fa-facebook text-blue-700" />
                                <i class="fab fa-facebook-messenger text-blue-500" />
                            </span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="mx-auto lg:w-8/12 bg-white mt-2 p-4">
            <AgencyItem :agency="product.agency" />
        </div>
        <div class="mx-auto lg:w-8/12 bg-white mt-2 p-4">
            {{ product.description }}
        </div>
        <div class="mx-auto lg:w-8/12 bg-white mt-2 p-4">
            <div class="font-bold text-lg mb-2">Cùng nhà cung cấp</div>
            <ProductsCarousel :products="products" />
        </div>
        <div class="mx-auto lg:w-8/12 bg-white mt-2 p-4">
            <div class="font-bold text-lg mb-2">Cùng danh mục</div>
            <ProductsCarousel :products="products" />
        </div>
    </ContentView>
</template>

<script>
    import { mapState } from 'vuex';
    import AgencyItem from '~/components/agencies/Item.vue';
    import ContentView from '~/components/layout/View.vue';
    import ProductsCarousel from '~/components/products/Carousel.vue';
    import ImagePreview from '~/components/products/ImagePreview.vue';

    export default {
        components: {
            AgencyItem,
            ImagePreview,
            ContentView,
            ProductsCarousel,
        },

        async asyncData({ store }) {
            await store.dispatch('products/getProducts');
            await store.dispatch('products/getProduct');
        },

        computed: {
            ...mapState('products', ['product', 'products']),

            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: 'Tiện ích - Gia dụng', link: '/' },
                    { title: this.product.name, link: '/' },
                ];
            },
        },
    };
</script>

<style lang="scss" scoped>
    .m-0 {
        margin: 0px !important;
    }
</style>
