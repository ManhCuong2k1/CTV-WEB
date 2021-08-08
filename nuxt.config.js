import path from 'path';

import {
    APP_ENV,
    HOST,
    PORT,
    APP_URL,
    API_HOST,
    API_PATH,
    IMAGE_BASE_URL,
    GOOGLE_ANALYTICS_ID,
    isProduction,
} from './env/nuxt';

export default {
    ssr: false,

    telemetry: false,

    components: false,

    dev: !isProduction,

    basic: {
        name: process.env.BASIC_AUTH,
        pass: process.env.BASIC_PASS,
        enabled: !isProduction,
    },

    srcDir: path.resolve(__dirname, 'src'),

    // When SPA
    loading: '~/components/Loading.vue',

    // When SSR
    loadingIndicator: {
        name: 'cube-grid',
        color: '#0c5d9e',
    },

    env: {
        APP_URL,
        API_HOST,
        API_PATH,
        IMAGE_BASE_URL,
        GOOGLE_ANALYTICS_ID,
    },

    css: [
        'element-ui/lib/theme-chalk/index.css',
    ],

    plugins: [
        '@/plugins/constants',
        '@/plugins/element-ui',
        '@/plugins/filters',
        { src: '@/plugins/persistedState.js' },
    ],

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/style-resources',
        '@nuxtjs/google-analytics',
        '@nuxtjs/fontawesome',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/robots',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxt/content',
    ],

    fontawesome: {
        icons: {
            solid: true,
            regular: true,
            light: [],
            duotone: [],
            brands: ['faFacebook'],
        },
    },

    auth: {
        scopeKey: 'scope',
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'a/auth/login', method: 'post', propertyName: 'token' },
                    user: { url: 'a/auth/me', method: 'get', propertyName: false },
                    logout: { url: 'a/auth/logout', method: 'post' },
                },
            },
        },
        redirect: {
            login: '/login',
            home: '/admin',
        },
        plugins: [
            './plugins/auth',
        ],
    },

    tailwindcss: {
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        jit: true,
    },

    robots: [
        {
            UserAgent: '*',
            Disallow: APP_ENV === 'production'
                ? [
                    '/*.json',
                    '/*.xml',
                ]
                : '/',
        },
    ],

    styleResources: {
        scss: [
            '~/assets/styles/utilities/*.scss',
        ],
    },

    server: {
        host: HOST,
        port: PORT,
    },

    render: {
        http2: {
            push: true,
        },
    },

    publicRuntimeConfig: {
        googleAnalytics: {
            id: GOOGLE_ANALYTICS_ID,
        },
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    // content: {},

    axios: {
        baseURL: API_HOST,
        browserBaseURL: API_PATH,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: isProduction,
        transpile: [/^element-ui/],
    },

    privateRuntimeConfig: {
        secretKey: process.env.GOOGLE_SECRET,
    },

};
