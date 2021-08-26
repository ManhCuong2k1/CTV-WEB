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
                <div v-if="isLoggedIn" class="flex">
                    <div class="2xl:mr-9 md:mr-7 sm:mr-4 mr-2">
                        <nuxt-link v-if="totalAmount" to="/cart">
                            <el-badge :value="totalAmount" :hidden="totalAmount <= 0">
                                <i class="text-2xl el-icon-shopping-cart-1" />
                            </el-badge>
                        </nuxt-link>
                        <div v-else @click="emptyCartAlert">
                            <i class="text-2xl el-icon-shopping-cart-1 cursor-pointer" />
                        </div>
                    </div>
                    <NotiList class="2xl:mr-9 md:mr-7 sm:mr-4 mr-2" />
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
    import { mapGetters, mapState } from 'vuex';
    import UserMenu from '~/components/layout/UserMenu.vue';
    import NotiList from '~/components/layout/NotiList.vue';
    import Search from '~/components/layout/Search.vue';

    export default {
        components: {
            NotiList,
            Search,
            UserMenu,
        },

        computed: {
            ...mapState('cart', ['cartList']),
            ...mapGetters('cart', ['totalAmount']),
            isLoggedIn() {
                return this.$auth.loggedIn;
            },
        },

        methods: {
            emptyCartAlert() {
                this.$message.warning('Giỏ hàng trống');
            },
        },
    };
</script>
