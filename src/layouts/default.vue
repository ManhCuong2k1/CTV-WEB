<template>
    <div class="flex flex-col min-h-screen relative bg-gray-100">
        <div class="bg-ctv hidden py-2 sm:block sm:w-full sticky top-0 z-30">
            <Header class="content-section text-white" />
        </div>
        <div class="content-section w-full my-1">
            <el-breadcrumb v-if="breadcrumb.length" separator-class="el-icon-arrow-right">
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
        </div>
        <div class="flex-grow main-content -p-5">
            <nuxt />
            <el-backtop target=".main-content" />
        </div>
        <Footer class="mt-2" />
    </div>
</template>

<script>
    import Header from '~/components/layout/Header.vue';
    import Footer from '~/components/layout/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
        },

        data: () => ({
            breadcrumb: [],
        }),

        provide() {
            return {
                setBreadcrumb: this.setBreadcrumb,
            };
        },

        mounted() {
            this.breadcrumb = [];
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
