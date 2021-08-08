<template>
    <div class="md:static sticky top-0 z-40 bg-white ">
        <div class="main-content header">
            <div class="max-w-screen-lg mx-auto px-4 lg:px-0 relative">
                <div
                    class="menu border-custom flex justify-between md:border-t"
                >
                    <div
                        id="nav-icon"
                        class="z-40 self-center menu-bar block md:hidden"
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                    <div class="flex-1 py-2 md:hidden">
                        <div class="block m-auto w-36">
                            <a href="/">
                                <img src="/images/logo.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div v-if="isLoggedIn" class="block py-2 md:hidden">
                        <UserMenu />
                    </div>
                    <div
                        ref="menuList"
                        class="menu-list opacity-0 fixed inset-0 -left-full p-12 bg-white z-30 w-full h-full md:flex md:w-auto md:static md:p-0 md:opacity-100"
                    >
                        <div class="flex items-center self-center md:hidden">
                            <div class="flex lg:mr-4 btn-search md:pr-0 pr-3">
                                <img
                                    src="/images/icons/iconSearch.svg"
                                    alt=""
                                    class="h-5"
                                >
                            </div>
                            <input
                                v-model="keyword"
                                type="text"
                                class="h-9 w-56 placeholder-gray-300 focus:outline-none search lg:block"
                                placeholder="Tìm kiếm theo tiêu đề, tác giả hoặc tag"
                                @keyup.enter="searchAction"
                            >
                        </div>
                        <div
                            class="font-bold mr-7 hover-color-primary"
                            @click="closedMenu()"
                        >
                            <nuxt-link to="/" class="py-3" exact>
                                Trang chủ
                            </nuxt-link>
                        </div>
                        <div
                            class="font-bold mr-7 hover-color-primary"
                            @click="closedMenu()"
                        >
                            <nuxt-link to="/sach" class="py-3">
                                Sách
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/diem-sach" class="py-3">
                                Điểm sách
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/tuyen-tap" class="py-3">
                                Tuyển tập
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/goc-nhin" class="py-3">
                                Góc nhìn
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/thu-vien" class="py-3">
                                Thư viện
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/podcast" class="py-3">
                                Podcast
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/giai-thuong" class="py-3">
                                Giải thưởng
                            </nuxt-link>
                        </div>
                        <div class="font-bold mr-7 hover-color-primary" @click="closedMenu()">
                            <nuxt-link to="/danh-muc/su-kien" class="py-3">
                                Sự kiện
                            </nuxt-link>
                        </div>
                        <div v-if="!isLoggedIn" class="flex mt-2 justify-between md:hidden">
                            <div
                                id="btn-register"
                                class="border border-custom-3 rounded-md text-sm color-custom-2 cursor-pointer py-2 px-8"
                            >
                                <nuxt-link to="/register">
                                    Đăng ký
                                </nuxt-link>
                            </div>
                            <div
                                id="btn-login"
                                class="border border-custom-3 rounded-md text-sm color-custom-2 cursor-pointer py-2 px-6"
                            >
                                <nuxt-link to="/login">
                                    <span>Đăng nhập</span>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center self-center md:flex">
                        <div class="flex lg:mr-4 btn-search md:pr-3 lg:mr-0">
                            <img
                                src="/images/icons/iconSearch.svg"
                                alt=""
                                class="h-5"
                            >
                        </div>
                        <input
                            v-model="keyword"
                            type="text"
                            class="h-9 w-28 placeholder-gray-300 focus:outline-none search lg:block"
                            placeholder="Tìm kiếm tiêu đề"
                            @keyup.enter="searchAction"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserMenu from './UserMenu.vue';

    export default {
        components: {
            UserMenu,
        },
        data() {
            return {
                keyword: '',
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
            searchAction() {
                this.$router.push({ path: '/tim-kiem', query: { k: this.keyword } });
                this.keyword = '';
            },
        },
    };
</script>
<style scoped>
.nuxt-link-active {
    color: rgb(73 181 216);
    border-bottom: 2px solid rgb(73 181 216);
}
.nuxt-link-exact-active {
    color: rgb(73 181 216);
    border-bottom: 2px solid rgb(73 181 216);
}
</style>
