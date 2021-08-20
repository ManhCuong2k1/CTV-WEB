<template>
    <div class="flex justify-center sm:justify-between items-center text-xs lg:text-sm">
        <div class="hidden sm:block">
            <span>Hotline: 0123.456.789</span>
            <el-divider direction="vertical" />
            <span>Kết nối</span>
            <el-divider direction="vertical" />
            <span>Tải app</span>
        </div>
        <div class="flex items-center">
            <nuxt-link to="/me/partner/register">
                Đăng ký thành viên
            </nuxt-link>
            <el-divider direction="vertical" />
            <nuxt-link to="/me/agency/register">
                Đăng ký NCC
            </nuxt-link>
            <el-divider direction="vertical" />
            <nuxt-link to="/login">
                Đăng nhập
            </nuxt-link>
        </div>
    </div>
</template>
