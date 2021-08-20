<template>
    <ContentView :links="navbarLinks">
        <div class="bg-white py-4">
            <AgencyItem class="content-container" :agency="agency" />
        </div>

        <div class="bg-white py-4 mt-2">
            <div class="content-container">
                <div class="text-lg font-bold mb-1">
                    <i class="fas fa-bolt mr-1 text-yellow-400" />Sản phẩm bán chạy
                </div>
                <ProductCarousel :products="agency.products" />
            </div>
        </div>

        <div class="py-2 mt-2">
            <div class="content-container flex justify-between">
                <CategoryMenu :categories="agency.categories" />
                <div class="flex-grow">
                    <div class="flex justify-between items-center mb-2">
                        <span>{{ 1234 | formatNumber }} sản phẩm</span>
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
                        <div :class="{'grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5' : isGridLayout}">
                            <div v-for="(product, index) in agency.products" :key="index">
                                <ProductItem :is-grid="isGridLayout" :product="product" class="p-1" />
                            </div>
                        </div>
                        <div class="flex justify-center mt-4">
                            <el-button type="primary" size="small" round>
                                <span class="px-36">Xem thêm</span>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContentView>
</template>

<script>
    import { mapState } from 'vuex';
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

        async asyncData({ store }) {
            await store.dispatch('agencies/getAgency', 1);
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
            ...mapState('agencies', ['agency']),

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
    };
</script>
