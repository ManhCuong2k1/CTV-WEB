<template>
    <div class="min-h-screen relative">
        <div class="bg-ctv">
            <SubHeader class="max-w-screen-xl mx-auto text-white text-sm z-30 py-1" />
        </div>
        <div class="bg-ctv hidden py-2 sm:block sm:w-full sticky top-0 z-30">
            <Header class="max-w-screen-xl mx-auto text-white" />
        </div>
        <el-breadcrumb v-if="breadcrumb.length" class="mx-auto lg:w-8/12 py-2" separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in breadcrumb"
                    :key="item.link"
                    :to="item.link"
                    class="text-xs"
                >
                    {{ item.title }}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
        <div>
            <div>
                <div class="main-content bg-gray-100 -p-5">
                    <nuxt />
                    <el-backtop target=".main-content" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
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
