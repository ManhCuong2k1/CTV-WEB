<template>
    <div>
        <el-row :gutter="10" class="flex items-center">
            <el-col :xs="6" :sm="4">
                <nuxt-link to="/">
                    <div class="text-3xl font-bold tracking-wider">
                        Battay
                    </div>
                </nuxt-link>
            </el-col>
            <el-col :xs="12" :sm="16">
                <Search />
            </el-col>
            <el-col :xs="6" :sm="4" class="flex justify-end items-center">
                <div v-if="isLoggedIn">
                    <i class="text-2xl 2xl:mr-9 md:mr-7 sm:mr-4 mr-2 el-icon-shopping-cart-1" />
                    <i class="text-2xl 2xl:mr-9 md:mr-7 sm:mr-4 mr-2 far fa-bell" />
                    <UserMenu />
                </div>
                <div v-else>
                    <nuxt-link to="/login">
                        Đăng nhập/Đăng ký
                    </nuxt-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import UserMenu from '~/components/layout/UserMenu.vue';
    import Search from '~/components/layout/Search.vue';

    export default {
        components: {
            Search,
            UserMenu,
        },

        computed: {
            isLoggedIn() {
                return this.$auth.loggedIn;
            },
        },
    };
</script>
