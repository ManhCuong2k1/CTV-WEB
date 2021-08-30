<template>
    <div class="content-section mb-2">
        <BreadCrumb :breadcrumb="navbarLinks" />
        <div class="flex justify-between items-start ">
            <CategoriesMenu :categories="categories" title="Tìm theo danh mục" class="mt-12 mr-2 bg-white p-4" />
            <div class="flex-grow flex flex-col">
                <div class="flex items-center h-12" :class="[searchQuery ? 'justify-between' : 'justify-end']">
                    <span v-if="searchQuery">{{ products.length | formatNumber }} kết quả tìm kiếm cho '{{ searchQuery }}'</span>
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
                <div class="search-tab flex-grow w-full bg-white">
                    <div :class="{'grid xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5' : isGridLayout}">
                        <div v-for="(product, index) in products" :key="index">
                            <ProductItem :is-grid="isGridLayout" :product="product" class="p-1" />
                        </div>
                    </div>
                    <div v-if="pagination.page < pagination.totalPage" class="flex justify-center mt-4 mb-2">
                        <el-button
                            type="primary"
                            size="small"
                            round
                            @click="loadMore"
                        >
                            <span class="px-36">Xem thêm</span>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _concat from 'lodash/concat';
    import { getAll as getProducts } from '~/api/products';
    import CategoriesMenu from '~/components/categories/Menu.vue';
    import BreadCrumb from '~/components/layout/BreadCrumb.vue';
    import ProductItem from '~/components/products/Item.vue';
    import SelectFilter from '~/components/filters/Select.vue';

    export default {
        components: {
            CategoriesMenu,
            BreadCrumb,
            ProductItem,
            SelectFilter,
        },

        async asyncData({ store, query }) {
            await store.dispatch('agencies/getAgencies');
            await store.dispatch('categories/getCategories');

            const res = await getProducts(query);

            return {
                products: res.data,
                pagination: {
                    page: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    totalPage: Math.ceil(res.total / res.pageSize),
                },
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
            activeTabName: 'products',
        }),

        computed: {
            ...mapState('agencies', ['agencies']),
            ...mapState('categories', ['categories']),

            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: 'Tìm kiếm', link: `/search?keyword=${this.searchQuery}` },
                ];
            },

            searchQuery() {
                return this.$route.query.keyword;
            },
        },

        methods: {
            changeProductLayout() {
                this.isGridLayout = !this.isGridLayout;
            },

            async loadMore() {
                const query = this.$route.query;
                query.page = this.pagination.page + 1;
                const res = await getProducts(query);
                this.products = _concat(this.products, res.data);
                this.pagination = {
                    page: res.page,
                    pageSize: res.pageSize,
                    total: res.total,
                    totalPage: Math.ceil(res.total / res.pageSize),
                };
            },
        },

        watchQuery: true,

        head() {
            return {
                title: 'Tìm kiếm | Battay',
            };
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
