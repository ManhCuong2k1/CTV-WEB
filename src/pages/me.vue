<template>
    <ContentView :links="navbarLinks" class="h-full">
        <div class="content-section flex justify-between mb-4">
            <Sidebar class="bg-white px-2 py-4 mr-2 mt-0" />
            <div class="bg-white flex-grow p-4">
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
