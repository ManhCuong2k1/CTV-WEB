<template>
    <div class="sticky top-0 z-50 bg-white md:py-3">
        <div class="justify-between hidden md:flex px-4 lg:px-0 main-content max-w-screen-lg mx-auto">
            <div class="w-36">
                <a href="/">
                    <img src="/images/logo.png" alt="">
                </a>
            </div>
            <div class="flex items-center">
                <nuxt-link
                    v-if="isLoggedIn"
                    to="/publish/blog"
                    class="btn bg-primary rounded-md cursor-pointer px-8 py-2 mr-6 text-white hover-bg-primary"
                >
                    Viết bài
                </nuxt-link>
                <div v-if="isLoggedIn" class="mr-7">
                    <!-- <NotiList /> -->
                </div>
                <div v-if="!isLoggedIn" class="flex">
                    <div
                        class="px-5 btn-register cursor-pointer hover-color-primary"
                    >
                        <nuxt-link to="/register">
                            Đăng ký
                        </nuxt-link>
                    </div>
                    <div
                        class="px-5 btn-login cursor-pointer hover-color-primary"
                    >
                        <nuxt-link to="/login">
                            Đăng nhập
                        </nuxt-link>
                    </div>
                </div>
                <div v-else>
                    <UserMenu />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserMenu from './UserMenu.vue';
    // import NotiList from './NotiList.vue';

    export default {
        components: {
            UserMenu,
            // NotiList,
        },
        data() {
            return {
                activeHome: false,
                activeBook: false,
                activePost: false,
                activeCategory: false,
            };
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.auth.loggedIn;
            },
        },
        methods: {
            closedMenu() {
                document.querySelector('.menu-list').classList.remove('active');
                document.querySelector('#nav-icon').classList.remove('open');
            },
        },
    };
</script>
<style scoped>
.active-menu {
    color: rgb(73 181 216);
    border-bottom: 2px solid rgb(73 181 216);
}
</style>
