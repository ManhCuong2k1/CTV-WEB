<template>
    <div class="mt-6">
        <div class="flex flex-col items-center">
            <el-avatar src="" :size="70" icon="el-icon-user-solid" />
            <div class="font-bold text-lg">
                {{ userLogged.name }}
            </div>
            <div class="text-gray-500 text-xs">
                {{ userLogged.phone }}
            </div>
        </div>
        <el-menu
            class="user-sidebar"
            :router="true"
            :default-active="activePath"
            :class="$style['user-menu']"
        >
            <el-menu-item index="/me">
                <i class="el-icon-user" />Thông tin tài khoản
            </el-menu-item>
            <el-menu-item index="/me/orders">
                <i class="el-icon-shopping-bag-1" />Lịch sử order
            </el-menu-item>
            <el-menu-item index="/me/notifications">
                <i class="el-icon-bell" />Thông báo
            </el-menu-item>
            <el-menu-item index="/me/agency/register">
                <i class="el-icon-takeaway-box" />Đăng ký Nhà cung cấp
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed: {
            activePath() {
                return this.$route.fullPath;
            },

            userLogged() {
                return this.$auth.user;
            },
        },

        head() {
            return {
                title: 'Lịch sử order | Battay',
            };
        },
    };
</script>

<style lang="scss" module>
    .user-menu {
        background: none !important;
        border-right: none;
    }
</style>
