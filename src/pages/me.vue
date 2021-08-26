<template>
    <div class="h-full">
        <BreadCrumb :breadcrumb="navbarLinks" />
        <div class="content-section flex justify-between mb-4">
            <Sidebar class="bg-white px-2 py-4 mr-2 mt-0" />
            <div class="bg-white flex-grow p-4">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '~/components/layout/BreadCrumb.vue';
    import Sidebar from '~/components/me/Sidebar.vue';

    export default {
        components: {
            BreadCrumb,
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
