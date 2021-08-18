<template>
    <el-aside width="210">
        <div>
            <i class="fas fa-list" /> <span class="uppercase font-bold">{{ title }}</span>
        </div>
        <el-menu
            :router="true"
            :default-active="$route.path"
            class="w-full"
            :class="$style['categories-menu']"
        >
            <el-menu-item
                v-for="(category, index) in categories"
                :key="index"
                :index="`/categories/${category.slug}`"
                :class="$style['categories-menu-item']"
                style="height: 42px"
            >
                {{ category.name }}
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
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
        },
    };
</script>

<style lang="scss" module>
    .categories-menu {
        background: none !important;
        width: 210px;

        &-item {
            @apply font-bold;
            height: 40px;
            &:hover {
                background: none !important;
                @apply translate-x-2 duration-200;
            }
        }
    }
</style>
