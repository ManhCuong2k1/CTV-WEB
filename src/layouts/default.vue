<template>
    <div class="flex flex-col min-h-screen relative bg-gray-100">
        <div class="bg-ctv hidden py-2 sm:block sm:w-full sticky top-0 z-30">
            <Header class="content-section text-white" />
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

        head: () => ({
            title: 'Battay - Kinh doanh không cần vốn',
            link: [
                {
                    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;0,900;1,100;1,400;1,700;1,900&display=swap',
                    rel: 'stylesheet',
                },
            ],
        }),
    };
</script>
