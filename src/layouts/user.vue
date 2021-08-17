<template>
    <div>
        <TopBar />
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
    import TopBar from '~/components/layout/TopBar.vue';
    import Header from '~/components/layout/Header.vue';
    import Footer from '~/components/layout/Footer.vue';

    const title = process.env.APP_NAME;
    const description = process.env.APP_DESCRIPTION;

    const meta = [
        {
            charset: 'utf-8',
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
        {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
        },
        {
            name: 'application-name',
            content: title,
        },
        {
            property: 'og:site_name',
            content: title,
        },
        {
            hid: 'description',
            name: 'description',
            content: description,
        },
        {
            hid: 'og:type',
            property: 'og:type',
            content: 'website',
        },
        {
            hid: 'og:title',
            property: 'og:title',
            content: title,
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: description,
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: 'og-facebook-3.png',
        },
        {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: title,
        },
        {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary',
        },
        {
            name: 'google-site-verification',
            content: '',
        },
    ];

    const link = [
        {
            rel: 'alternate',
            type: 'application/rss+xml',
            name: 'RSS Feed',
            href: '/rss',
        },
    ];

    const script = [
        {
            type: 'module',
            src: '/js/script.js',
            body: true,
        },
    ];

    export default {
        components: {
            TopBar,
            Header,
            Footer,
        },
        head: {
            htmlAttrs: {
                lang: 'vi',
            },
            title: 'Home page',
            meta,
            link,
            script,
        },
    };
</script>

<style lang="scss" src="@/assets/scss/index.scss">
</style>
