<template>
    <el-container class="guest app w-full min-h-screen relative bg-gray-200" :class="$style.guest">
        <el-header :class="$style.header" class="bg-ctv hidden py-2 sm:block sm:w-full sticky top-0 z-30">
            <Header class="mx-auto lg:w-8/12 text-white" :title="title" />
        </el-header>
        <el-container>
            <transition name="home">
                <el-main class="main-content -p-2" :class="$style.main">
                    <nuxt />
                    <el-backtop target=".main-content" />
                </el-main>
            </transition>
        </el-container>
        <Footer />
    </el-container>
</template>

<script>
    import Header from '~/components/layout/GuestHeader.vue';
    import Footer from '~/components/layout/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
        },

        data: () => ({
            title: null,
        }),

        provide() {
            return {
                setTitle: this.setTitle,
            };
        },

        methods: {
            setTitle(value) {
                this.title = value;
            },
        },

        head: () => ({
            title: 'CTV Pro',
        }),
    };
</script>

<style lang="scss" module>
    .guest {
        font-family: "Roboto";
    }
    .header {
        height: auto !important;
    }
    .main {
        padding: 0;
    }
</style>

<style lang="scss">
    .content-container {
        @apply lg:w-8/12;
        margin-left: auto !important;
        margin-right: auto !important;
    }
</style>
