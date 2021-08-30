<template>
    <div class="flex justify-center sm:justify-between items-center text-xs lg:text-sm">
        <div class="hidden sm:flex items-center">
            <a href="tel:0123456789" class="mr-2">
                Hotline: {{ hotline | formatPhone }}
            </a>
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
            <div v-if="isLoggedIn" class="p-0 cursor-pointer">
                <nuxt-link to="/me" class="text-white">
                    Chào {{ auth.name }}
                </nuxt-link>
            </div>
            <nuxt-link v-else to="/login">
                Đăng nhập/Đăng ký
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _find from 'lodash/find';

    export default {
        computed: {
            ...mapState(['info']),

            hotline() {
                return _find(this.info.data, (item) => item.key === 'hotline').value;
            },

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
