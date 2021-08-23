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
            <nuxt-link to="/me/agency/register">
                Đăng ký NCC
            </nuxt-link>
            <el-divider direction="vertical" />
            <el-button v-if="isLoggedIn" class="p-0" type="text" @click="signOut">
                <span class="text-white">Đăng xuất</span>
            </el-button>
            <nuxt-link v-else to="/login">
                Đăng nhập
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isLoggedIn() {
                return this.$auth.loggedIn;
            },

            auth() {
                return this.$auth.user;
            },
        },

        methods: {
            async signOut() {
                await this.$auth.logout();
                this.$router.push('/');
            },
        },
    };
</script>
