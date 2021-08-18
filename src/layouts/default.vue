<template>
    <el-container class="app w-full min-h-screen relative bg-gray-200">
        <div :class="$style.header">
            <SubHeader class="mx-auto lg:w-8/12 text-white text-sm z-30" />
        </div>
        <el-header :class="$style.header" class="sticky top-0 z-30">
            <Header class="mx-auto lg:w-8/12 text-white" />
        </el-header>
        <el-breadcrumb v-if="breadcrumb.length" class="mx-auto lg:w-8/12 py-2" separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="item in breadcrumb" :key="item.link" :to="item.link" class="text-xs">
                    {{ item.title }}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
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
    import SubHeader from '~/components/layout/SubHeader.vue';
    import Header from '~/components/layout/Header.vue';
    import Footer from '~/components/layout/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
            SubHeader,
        },

        data: () => ({
            breadcrumb: [],
        }),

        provide() {
            return {
                setBreadcrumb: this.setBreadcrumb,
            };
        },

        methods: {
            setBreadcrumb(value) {
                this.breadcrumb = value;
            },
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

<style lang="scss">
    .content-container {
        @apply lg:w-8/12;
        margin-left: auto !important;
        margin-right: auto !important;
    }
</style>
