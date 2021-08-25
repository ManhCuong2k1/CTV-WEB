<template>
    <ContentView :links="navbarLinks">
        <div class="bg-white py-4">
            <div class="content-section">
                <AgencyItem :agency="agency" />
            </div>
        </div>

        <div class="bg-white py-4 mt-4">
            <div class="content-section">
                <div class="text-lg font-bold mb-1">
                    <i class="fas fa-bolt mr-1 text-yellow-400" />Sản phẩm mới
                </div>
                <ProductCarousel :products="newProducts" />
            </div>
        </div>

        <div>
            <div class="content-section flex justify-between">
                <CategoryMenu :categories="categories" class="mt-12 mr-2" />
                <div class="flex-grow">
                    <div class="flex justify-between items-center h-12">
                        <span>{{ products.length | formatNumber }} sản phẩm</span>
                        <div class="flex items-center">
                            <SelectFilter
                                query="sort"
                                :options="sortOptions"
                                size="small"
                                class="mr-2"
                            />
                            <el-button class="w-8" type="text" @click="changeProductLayout">
                                <i
                                    class="text-black text-lg"
                                    :class="[isGridLayout ? 'fas fa-border-all' : 'fas fa-list']"
                                />
                            </el-button>
                        </div>
                    </div>
                    <div class="bg-white p-2">
                        <div v-if="products.length > 0">
                            <div :class="{'grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' : isGridLayout}">
                                <div v-for="(product, index) in products" :key="index">
                                    <ProductItem :is-grid="isGridLayout" :product="product" class="p-1" />
                                </div>
                            </div>
                            <div class="flex justify-center mt-4">
                                <el-button type="primary" size="small" round>
                                    <span class="px-36">Xem thêm</span>
                                </el-button>
                            </div>
                        </div>
                        <div v-else>
                            <el-empty description="Không có sản phẩm nào" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContentView>
</template>

<script>
    import { getAgency } from '~/api/agencies';
    import { getAll as getCategories } from '~/api/categories';
    import { getAll as getProducts } from '~/api/products';
    import AgencyItem from '~/components/agencies/Item.vue';
    import CategoryMenu from '~/components/categories/Menu.vue';
    import ContentView from '~/components/layout/View.vue';
    import ProductCarousel from '~/components/products/Carousel.vue';
    import ProductItem from '~/components/products/Item.vue';
    import SelectFilter from '~/components/filters/Select.vue';

    export default {
        components: {
            AgencyItem,
            CategoryMenu,
            ContentView,
            ProductCarousel,
            ProductItem,
            SelectFilter,
        },

        async asyncData({ query, params }) {
            const { data: agency } = await getAgency(params.id);
            const { data: categories } = await getCategories();
            const { data: newProducts } = await getProducts({
                distributorId: params.id,
            });
            const { data: products } = await getProducts({
                distributorId: params.id,
                categoryId: query.categoryId,
            });

            return {
                agency,
                categories,
                products,
                newProducts,
            };
        },

        data: () => ({
            sortOptions: [{
                label: 'Sắp xếp mặc định',
                value: '',
            }, {
                label: 'Giá thấp nhất',
                value: '',
            }, {
                label: 'Giá cao nhất',
                value: '',
            }],
            isGridLayout: true,
        }),

        computed: {
            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: this.agency.name, link: `/agencies/${this.agency.id}` },
                ];
            },
        },

        methods: {
            changeProductLayout() {
                this.isGridLayout = !this.isGridLayout;
            },
        },

        watchQuery: true,
    };
</script>
