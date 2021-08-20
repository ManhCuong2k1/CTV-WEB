<template>
    <ContentView :links="navbarLinks">
        <div class="content-container flex justify-between bg-white mb-4">
            <Sidebar />
            <div class="flex-grow m-4">
                <nuxt-child />
            </div>
        </div>
    </ContentView>
</template>

<script>
    import ContentView from '~/components/layout/View.vue';
    import Sidebar from '~/components/me/Sidebar.vue';

    export default {
        components: {
            ContentView,
            Sidebar,
        },

        computed: {
            navbarLinks() {
                return [
                    { title: 'Trang chủ', link: '/' },
                    { title: 'Tiện ích - Gia dụng', link: '/' },
                ];
            },
        },
    };
</script>
