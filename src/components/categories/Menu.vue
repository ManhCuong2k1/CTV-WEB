<template>
    <el-aside width="220" class="overflow-hidden p-2">
        <div>
            <i class="fas fa-list" /> <span class="uppercase font-bold">{{ title }}</span>
        </div>
        <el-menu
            :default-active="activeCategory"
            class="w-full overflow-hidden"
            :class="$style['categories-menu']"
            @select="onSelected"
        >
            <el-menu-item
                :class="$style['categories-menu-item']"
                class="truncate"
            >
                Tất cả
            </el-menu-item>
            <el-menu-item
                v-for="category in categories"
                :key="category.id"
                :index="`${category.id}`"
                :class="$style['categories-menu-item']"
                class="truncate"
            >
                {{ category.name }} {{ category.id }}
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
    import _assign from 'lodash/assign';
    import _omit from 'lodash/omit';

    export default {
        props: {
            categories: {
                type: Array,
                required: true,
            },
            title: {
                type: String,
                default: 'Danh mục',
            },
            query: {
                type: String,
                default: 'categoryId',
            },
        },

        computed: {
            activeCategory() {
                return this.$route.query[this.query] || null;
            },
        },

        methods: {
            onSelected(category) {
                const path = this.$route.path;
                const otherParams = _omit(this.$route.query, [this.query]);
                const query = category !== null
                    ? _assign({}, otherParams, { [this.query]: category })
                    : otherParams;

                this.$router.push({ path, query });
            },
        },
    };
</script>

<style lang="scss" module>
    .categories-menu {
        background: none !important;
        width: 210px;
        border-right: none;

        &-item {
            height: 40px;
            line-height: 40px;
            &:hover {
                background: none !important;
                @apply translate-x-2 duration-200;
            }
        }
    }
</style>
