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
    telemetry: false,

    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/images/logo.svg' },
        ],
    },

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
        '@fortawesome/fontawesome-free/css/all.css',
    ],

    plugins: [
        '@/plugins/constants',
        '@/plugins/element-ui',
        '@/plugins/filters',
        '@/plugins/swiper',
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

    axios: {
        baseURL: `${API_HOST}${API_PATH}`,
        prefix: API_PATH,
    },

    auth: {
        scopeKey: 'scope',
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'auth/login-password', method: 'post', propertyName: 'token' },
                    user: { url: 'app/users/me', method: 'get' },
                    logout: false,
                },
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer',
                },
                user: {
                    property: false,
                    autoFetch: true,
                },
            },
        },
        rewriteRedirects: false,
        redirect: false,
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

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: isProduction,
        transpile: [/^element-ui/],
        babel: {
            plugins: [
                '@babel/plugin-proposal-optional-chaining',
            ],
        },
    },

    privateRuntimeConfig: {
        secretKey: process.env.GOOGLE_SECRET,
    },

};
