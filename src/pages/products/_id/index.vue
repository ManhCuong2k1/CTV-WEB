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
                                <div class="flex justify-end items-center">
                                    <span class="mr-2">Giá bán lẻ tham khảo:</span>
                                    <span v-if="isLoggedIn" class="flex items-center text-red-500 text-xl">
                                        <div v-if="canViewPrice">
                                            {{ product.price | formatNumber }}₫
                                        </div>
                                        <el-tag
                                            v-else
                                            type="danger"
                                            effect="plain"
                                            size="mini"
                                        >
                                            <span class="text-xs">Không đủ cấp TV</span>
                                        </el-tag>
                                    </span>
                                    <nuxt-link v-else to="/login" class="ml-2">
                                        <el-tag
                                            type="danger"
                                            effect="plain"
                                            size="mini"
                                        >
                                            <span class="text-xs">Đăng ký TV để xem giá</span>
                                        </el-tag>
                                    </nuxt-link>
                                </div>
                                <div class="flex justify-end items-center mt-2">
                                    <span class="mr-2">Giá Thành viên:</span>
                                    <span v-if="isLoggedIn" class="flex items-center text-red-500 text-xl">
                                        <div v-if="canViewPrice">
                                            {{ product.promotionPrice | formatNumber }}₫
                                        </div>
                                        <el-tag
                                            v-else
                                            type="danger"
                                            effect="plain"
                                            size="mini"
                                        >
                                            <span class="text-xs">Không đủ cấp TV</span>
                                        </el-tag>
                                    </span>
                                    <nuxt-link v-else to="/login" class="ml-2">
                                        <el-tag
                                            type="danger"
                                            effect="plain"
                                            size="mini"
                                        >
                                            <span class="text-xs">Đăng ký TV để xem giá</span>
                                        </el-tag>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12">
                            <span class="mr-4">SỐ LƯỢNG: </span>
                            <el-input-number
                                v-model="quantity"
                                size="small"
                                :min="1"
                                :max="product.volume"
                            />
                            <span class="ml-2 text-gray-500">(Còn lại {{ product.volume | formatNumber }} sản phẩm)</span>
                        </div>
                        <div class="flex justify-start items-center flex-wrap mt-4">
                            <el-button size="medium" @click="copyContent">
                                <div class="flex items-center">
                                    <i class="el-icon-document-copy text-lg mr-1" /> Sao chép
                                </div>
                            </el-button>
                            <el-button type="primary" size="medium">
                                <div class="flex items-center">
                                    <i class="el-icon-download text-lg mr-1" /> Tải ảnh
                                </div>
                            </el-button>
                            <el-button
                                type="danger"
                                size="medium"
                                @click="addCart"
                            >
                                <div class="flex items-center">
                                    <i class="el-icon-shopping-cart-1 text-lg mr-1"> Thêm vào giỏ hàng
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
                        <div>{{ product.content }}</div>
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
                        <div>{{ product.content }}</div>
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
    import _find from 'lodash/find';
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
            ...mapState(['info']),

            canViewPrice() {
                const authUser = this.$auth.user;
                // eslint-disable-next-line eqeqeq
                const priceLevel = _find(this.info.priceLevel, (level) => level.value == authUser.level);

                return this.product.price <= priceLevel.max || priceLevel.max === -1;
            },

            isLoggedIn() {
                return this.$auth.loggedIn;
            },
        },

        methods: {
            async addCart() {
                if (this.isLoggedIn && this.canViewPrice) {
                    await this.$store.commit('cart/addToCart', {
                        productId: this.product.id,
                        amount: this.quantity,
                    });
                    this.$message.success('Thêm sản phẩm vào giỏ hàng thành công');
                } else if (this.isLoggedIn && !this.canViewPrice) {
                    this.$message.warning('Bạn không đủ cấp TV để mua sản phẩm này');
                } else if (!this.loggedIn && !this.canViewPrice) {
                    this.$message.warning('Vui lòng đăng nhập để thực hiện chức năng này');
                }
            },

            copyContent() {
                if (this.product.content) {
                    try {
                        const input = document.createElement('input');
                        input.setAttribute('value', this.product.content);
                        document.body.appendChild(input);
                        input.select();
                        document.execCommand('copy');
                        document.body.removeChild(input);
                        this.$message.success('Đã sao chép mô tả!');
                    } catch (error) {
                        this.$message.erorr('Có lỗi xảy ra vui lòng thử lại sau');
                    }
                }
            },
        },

        head() {
            return {
                title: `${this.product.name} | Battay`,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .m-0 {
        margin: 0px !important;
    }
</style>
