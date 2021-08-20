<template>
    <div class="mt-6">
        <div class="flex flex-col items-center">
            <el-avatar src="" :size="70" icon="el-icon-user-solid" />
            <div class="font-bold text-lg">
                Lorem ipsum dolor
            </div>
            <div class="text-gray-500 text-xs">
                example@example.vn
            </div>
        </div>
        <el-menu
            class="user-sidebar"
            :router="true"
            :default-active="activePath"
            :class="$style['user-menu']"
        >
            <el-menu-item index="/me">
                <i class="el-icon-user" />Thông tin cá nhân
            </el-menu-item>
            <el-menu-item index="/me/purchase">
                <i class="el-icon-shopping-bag-1" />Đơn mua
            </el-menu-item>
            <el-menu-item index="/me/notifications">
                <i class="el-icon-bell" />Thông báo
            </el-menu-item>
            <el-menu-item index="/me/partner/address">
                <i class="el-icon-location-information" />Quản lý địa chỉ
            </el-menu-item>
            <el-menu-item index="/me/agency/products">
                <i class="el-icon-takeaway-box" />Quản lý sản phẩm
            </el-menu-item>
            <el-menu-item index="/me/agency/register">
                <i class="el-icon-takeaway-box" />Đăng ký Nhà cung cấp
            </el-menu-item>
            <el-menu-item index="/me/partner/register">
                <i class="el-icon-receiving" />Đăng ký Cộng tác viên
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
        },
    };
</script>

<style lang="scss" module>
    .user-menu {
        background: none !important;
    }
</style>
