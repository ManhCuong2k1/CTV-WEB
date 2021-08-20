<template>
    <div>
        <el-row :gutter="10" class="flex items-center my-2">
            <el-col :xs="6" :sm="4">
                &nbsp;
            </el-col>
            <el-col :xs="12" :sm="16">
                <Search />
            </el-col>
            <el-col :xs="6" :sm="4" class="flex justify-end items-center">
                <i class="text-2xl 2xl:mr-9 md:mr-7 sm:mr-4 mr-2 el-icon-shopping-cart-1" />
                <i class="text-2xl 2xl:mr-9 md:mr-7 sm:mr-4 mr-2 far fa-bell" />
                <nuxt-link to="/me">
                    <i class="text-2xl far fa-user-circle" />
                </nuxt-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Search from '~/components/layout/Search.vue';

    export default {
        components: {
            Search,
        },
    };
</script>
