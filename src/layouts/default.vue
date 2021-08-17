<template>
    <el-container class="app w-full h-screen relative">
        <div :class="$style.header">
            <SubHeader class="mx-auto lg:w-9/12 text-white text-sm z-30" />
        </div>
        <el-header :class="$style.header" class="sticky top-0 z-30">
            <Header class="mx-auto lg:w-9/12 text-white" />
        </el-header>
        <el-container>
            <transition name="home">
                <el-main class="-p-2 bg-gray-200" :class="$style.main">
                    <nuxt />
                </el-main>
            </transition>
        </el-container>
        <Footer />
        <el-backtop target=".app" />
    </el-container>
</template>

<script>
    import SubHeader from '~/components/layout/SubHeader.vue';
    import Header from '~/components/layout/Header.vue';
    import Footer from '~/components/layout/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
            SubHeader,
        },

        head: () => ({
            title: 'CTV Pro',
        }),
    };
</script>

<style lang="scss" module>
    .header {
        height: auto !important;
        background-color: #4267b2;
    }
    .main {
        padding: 0;
    }
</style>
