<template>
    <ContentView :links="navbarLinks" class="content-container flex justify-between items-start mb-2">
        <CategoriesMenu :categories="categories" title="Tìm theo danh mục" class="mt-3" />
        <div class="flex-grow flex flex-col">
            <div class="flex justify-between items-center mb-2">
                <span>{{ 1234 | formatNumber }} kết quả tìm kiếm cho '{{ searchQuery }}'</span>
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
            <el-tabs v-model="activeTabName" class="search-tab flex-grow w-full bg-white">
                <el-tab-pane label="Sản phẩm" name="products">
                    <div :class="{'grid xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5' : isGridLayout}">
                        <div v-for="(product, index) in products" :key="index">
                            <ProductItem :is-grid="isGridLayout" :product="product" class="p-1" />
                        </div>
                    </div>
                    <div class="flex justify-center mt-4 mb-2">
                        <el-button type="primary" size="small" round>
                            <span class="px-36">Xem thêm</span>
                        </el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Nhà cung cấp" name="agencies" class="p-4">
                    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="index in 6" :key="index">
                            <AgencyItem :agency="agencies[0]" class="p-1" />
                        </div>
                    </div>
                    <div class="flex justify-center mt-4 mb-2">
                        <el-button type="primary" size="small" round>
                            <span class="px-36">Xem thêm</span>
                        </el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </ContentView>
</template>

<script>
    import { mapState } from 'vuex';
    import AgencyItem from '~/components/agencies/SearchItem.vue';
    import CategoriesMenu from '~/components/categories/Menu.vue';
    import ContentView from '~/components/layout/View.vue';
    import ProductItem from '~/components/products/Item.vue';
    import SelectFilter from '~/components/filters/Select.vue';

    export default {
        components: {
            AgencyItem,
            CategoriesMenu,
            ContentView,
            ProductItem,
            SelectFilter,
        },

        async asyncData({ store }) {
            await store.dispatch('agencies/getAgencies');
            await store.dispatch('categories/getCategories');
            await store.dispatch('products/getProducts');
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
            activeTabName: 'products',
        }),

        computed: {
            ...mapState('agencies', ['agencies']),
            ...mapState('categories', ['categories']),
            ...mapState('products', ['products']),

            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: 'Tìm kiến', link: `/search?q=${this.searchQuery}` },
                ];
            },

            searchQuery() {
                return this.$route.query.q;
            },
        },

        methods: {
            changeProductLayout() {
                this.isGridLayout = !this.isGridLayout;
            },
        },
    };
</script>

<style lang="scss">
    .search-tab {
        .el-tabs {
            &__nav {
                @apply w-full;
            }
            &__item  {
                @apply w-1/2 text-center;
            }
        }
    }
</style>
