<template>
    <el-dropdown trigger="click">
        <i class="text-2xl far fa-user-circle text-white" />
        <el-dropdown-menu slot="dropdown" class="user-menu">
            <el-dropdown-item disabled>
                <div class="text-md text-center leading-6 p-1 w-full my-2">
                    <div class="font-semibold user-fullname">
                        {{ userLogged.name }}
                    </div>
                    <div class="font-thin">
                        @{{ userLogged.phone }}
                    </div>
                </div>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item sign-out">
                <nuxt-link to="/me">
                    <i class="mr-1 fas fa-user-alt" /> Thông tin tài khoản
                </nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item sign-out">
                <nuxt-link to="/me/agency/register">
                    <i class="mr-1 fas fa-store" /> Đăng ký làm NCC
                </nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item sign-out">
                <div @click="signOut()">
                    <i class="mr-1 fas fa-sign-out-alt" /> Đăng xuất
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    // import { image as toImage } from '~/utils/url';

    export default {
        computed: {
            isLoggedIn() {
                return this.$auth.loggedIn;
            },

            userLogged() {
                return this.$auth.user;
            },
        },
        methods: {
            // toImage,
            async signOut() {
                await this.$auth.logout();
                this.$store.commit('cart/clearCart');
                this.$message.success('Đăng xuất thành công');
                this.$router.push('/');
            },
        },
    };
</script>

<style lang="sass" scoped>
.user-fullname
    color: #5c7293
.user-icon
    border-radius: 100%
    max-height: 40px
    max-width: 40px
.user-icon-big
    border-radius: 100%
    max-height: 60px
    max-width: 60px
.user-menu
    padding: 0px
    .user-menu-item
        font-size: 15px
        padding: 5px 18px
    .user-menu-item.sign-out
            border-top: 1px solid #dcdcdc
</style>
