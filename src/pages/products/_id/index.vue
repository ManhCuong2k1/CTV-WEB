<template>
    <ContentView :links="navbarLinks">
        <div class="content-section bg-white p-4">
            <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                    <ImagePreview :product="product" />
                </el-col>
                <el-col :xs="24" :sm="14">
                    <div class="font-bold text-lg">
                        {{ product.name }}
                    </div>
                    <div class="text-xs">
                        Mã SP: <span class="font-bold">{{ product.id }}</span>
                    </div>
                    <el-divider class="m-0" />
                    <div class="flex justify-between flex-wrap mt-4">
                        <div class="text-lg">
                            Lợi nhuận: <span class="text-red-500 font-bold text-xl">{{ product.price - product.promotionPrice | formatNumber }}₫</span>
                        </div>
                        <div class="text-sm text-right">
                            <div>
                                Giá bán lẻ tham khảo: <span class="text-red-500 text-xl">{{ product.price | formatNumber }}₫</span>
                            </div>
                            <div>
                                Giá Thành viên: <span class="text-red-500 text-xl">{{ product.promotionPrice | formatNumber }}₫</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12">
                        <span class="mr-4">Số lượng: </span>
                        <el-input-number v-model="quantity" size="small" :min="1" />
                    </div>
                    <div class="flex justify-start items-center flex-wrap mt-4">
                        <el-button type="danger" size="medium">
                            <div class="flex items-center">
                                <i class="el-icon-shopping-cart-1 text-lg mr-1" /> Thêm vào giỏ hàng
                            </div>
                        </el-button>
                        <el-button size="medium">
                            <div class="flex items-center">
                                <i class="el-icon-document-copy text-lg mr-1" /> Sao chép
                            </div>
                        </el-button>
                        <el-button type="primary" size="medium">
                            <div class="flex items-center">
                                <i class="el-icon-download text-lg mr-1" /> Tải ảnh
                            </div>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content-section bg-white p-4 mt-2">
            <AgencyItem :agency="product.agency" />
        </div>
        <div class="content-section bg-white mt-2 p-2">
            {{ product.description }}
        </div>
        <div class="content-section bg-white mt-2 p-2">
            <div class="font-bold text-lg mb-2">Cùng nhà cung cấp</div>
            <ProductsCarousel :products="sameAgency" />
        </div>
        <div class="content-section bg-white mt-2 p-2">
            <div class="font-bold text-lg mb-2">Cùng danh mục</div>
            <ProductsCarousel :products="sameCategory" />
        </div>
    </ContentView>
</template>

<script>
    import { mapState } from 'vuex';
    import { getAll as getProducts } from '~/api/products';
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

        async asyncData({ store, params }) {
            await store.dispatch('products/getProducts');
            await store.dispatch('products/getProduct', params.id);

            const { data: sameAgency } = await getProducts({
                distributorId: store.state.products?.product?.AdminId,
            });

            const { data: sameCategory } = await getProducts({
                categoryId: store.state.products?.product?.ProductCategoryId,
            });

            return {
                sameCategory,
                sameAgency,
            };
        },

        data: () => ({
            quantity: 1,
        }),

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
