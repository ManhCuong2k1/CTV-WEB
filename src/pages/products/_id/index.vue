<template>
    <div>
        <div class="h-10 leading-10 flex flex-col justify-center">
            <BreadCrumb :breadcrumb="navbarLinks" />
        </div>
        <div class="bg-white">
            <div class="content-section py-9">
                <el-row :gutter="30">
                    <el-col :xs="24" :sm="10">
                        <ImagePreview :product="product" />
                    </el-col>
                    <el-col :xs="24" :sm="14">
                        <div class="font-normal text-xl mb-2">
                            {{ product.name }}
                        </div>
                        <div class="text-xs mb-2">
                            Mã SP: <span class="font-bold">{{ product.id }}</span>
                        </div>
                        <div>
                            <div v-if="product.note">
                                {{ product.note }}
                            </div>
                            <div v-else>
                                Giao hàng trong vòng 1 đến 3 ngày
                            </div>
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
                            <span class="mr-4">SỐ LƯỢNG: </span>
                            <el-input-number v-model="quantity" size="small" :min="1" />
                        </div>
                        <div class="flex justify-start items-center flex-wrap mt-4">
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
                            <el-button type="danger" size="medium">
                                <div class="flex items-center">
                                    <i class="el-icon-shopping-cart-1 text-lg mr-1" @click="addCart"> Thêm vào giỏ hàng
                                    </i>
                                </div>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="bg-white py-8 mt-3">
            <div class="content-section">
                <AgencyItem :agency="product.distributorInfo" />
            </div>
        </div>
        <div class="bg-white pt-8 pb-1 mt-3">
            <div v-if="product.content" class="content-section bg-white mt-2">
                <div class="font-bold text-lg">
                    Mô tả sản phẩm
                </div>
                <div v-if="product.content.length > 500 && showContent == false">
                    <div class="max-h-40 overflow-hidden">
                        <div v-html="product.content" />
                    </div>
                    <div
                        class="text-center text-yellow-600 h-10 leading-10 hover:cursor-pointer"
                        @click="showContent = !showContent"
                    >
                        Xem thêm <i class="el-icon-arrow-down" />
                    </div>
                </div>
                <div v-if="showContent == true">
                    <div>
                        <div v-html="product.content" />
                    </div>
                    <div
                        class="text-center text-yellow-600 h-10 leading-10 hover:cursor-pointer"
                        @click="showContent = !showContent"
                    >
                        Thu gọn <i class="el-icon-arrow-up" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white py-2 mt-3">
            <div class="content-section bg-white mt-2 p-2">
                <div class="font-bold text-lg mb-5">
                    Sản phẩm cùng Nhà cung cấp
                </div>
                <ProductsCarousel :products="sameAgency" />
            </div>
        </div>
        <div class="bg-white py-2 mt-3">
            <div class="content-section bg-white mt-2 p-2">
                <div class="font-bold text-lg mb-5">
                    Sản phẩm cùng Danh mục
                </div>
                <ProductsCarousel :products="sameCategory" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { getAll as getProducts, getProduct } from '~/api/products';
    import AgencyItem from '~/components/agencies/Item.vue';
    import BreadCrumb from '~/components/layout/BreadCrumb.vue';
    import ProductsCarousel from '~/components/products/Carousel.vue';
    import ImagePreview from '~/components/products/ImagePreview.vue';

    export default {
        components: {
            AgencyItem,
            ImagePreview,
            BreadCrumb,
            ProductsCarousel,
        },

        async asyncData({ store, params }) {
            await store.dispatch('products/getProducts');
            const { data: product } = await getProduct(params.id);

            const { data: sameAgency } = await getProducts({
                distributorId: product.AdminId,
            });

            const { data: sameCategory } = await getProducts({
                categoryId: product.ProductCategory.id,
            });

            const navbarLinks = [
                { title: 'Trang chủ', link: '/' },
                { title: product.ProductCategory.name, link: `/category/${product.ProductCategory.id}` },
                { title: product.name, link: '/' },
            ];

            return {
                product,
                sameCategory,
                sameAgency,
                navbarLinks,
            };
        },

        data: () => ({
            quantity: 1,
            showContent: false,
        }),

        computed: {
            ...mapState('products', ['products']),
        },

        methods: {
            async addCart() {
                await this.$store.commit('cart/addToCart', {
                    productId: this.product.id,
                    amount: this.quantity,
                });
                this.$message.success('Thêm sản phẩm vào giỏ hàng thành công');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .m-0 {
        margin: 0px !important;
    }
</style>
